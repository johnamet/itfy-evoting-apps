/**
 * Server Manager for Console
 * Controls the backend server (start, stop, restart)
 */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export class ServerManager {
  constructor(config) {
    this.config = config;
    this.serverProcess = null;
    this.isRunning = false;
    this.logs = [];
    this.maxLogs = 1000;
    this.startTime = null;
  }

  /**
   * Check if server is running
   */
  isServerRunning() {
    return this.isRunning && this.serverProcess !== null;
  }

  /**
   * Get server status
   */
  getStatus() {
    return {
      running: this.isRunning,
      pid: this.serverProcess?.pid || null,
      uptime: this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0,
      port: this.config.get('PORT', '3000'),
      environment: this.config.get('NODE_ENV', 'development'),
    };
  }

  /**
   * Start the backend server
   */
  async startServer(options = {}) {
    if (this.isRunning) {
      throw new Error('Server is already running');
    }

    const { mode = 'dev', silent = false } = options;
    const cwd = process.cwd();

    // Determine the command based on mode
    let command, args;
    if (mode === 'production') {
      command = 'node';
      args = ['dist/app.js'];
    } else {
      command = 'npx';
      args = ['nodemon'];
    }

    return new Promise((resolve, reject) => {
      try {
        this.serverProcess = spawn(command, args, {
          cwd,
          stdio: ['pipe', 'pipe', 'pipe'],
          env: {
            ...process.env,
            NODE_ENV: mode === 'production' ? 'production' : 'development',
            FORCE_COLOR: '1',
          },
          detached: false,
        });

        this.isRunning = true;
        this.startTime = Date.now();
        this.logs = [];

        // Handle stdout
        this.serverProcess.stdout.on('data', (data) => {
          const message = data.toString();
          this.addLog('stdout', message);
          if (!silent) {
            process.stdout.write(message);
          }
        });

        // Handle stderr
        this.serverProcess.stderr.on('data', (data) => {
          const message = data.toString();
          this.addLog('stderr', message);
          if (!silent) {
            process.stderr.write(message);
          }
        });

        // Handle close
        this.serverProcess.on('close', (code) => {
          this.isRunning = false;
          this.startTime = null;
          this.addLog('system', `Server exited with code ${code}`);
        });

        // Handle error
        this.serverProcess.on('error', (error) => {
          this.isRunning = false;
          this.addLog('error', error.message);
          reject(error);
        });

        // Wait a bit to check if server started successfully
        setTimeout(() => {
          if (this.isRunning) {
            resolve({
              success: true,
              pid: this.serverProcess.pid,
              message: 'Server started successfully',
            });
          }
        }, 2000);

      } catch (error) {
        this.isRunning = false;
        reject(error);
      }
    });
  }

  /**
   * Stop the backend server
   */
  async stopServer() {
    if (!this.isRunning || !this.serverProcess) {
      throw new Error('Server is not running');
    }

    return new Promise((resolve, reject) => {
      try {
        // Try graceful shutdown first
        this.serverProcess.kill('SIGTERM');

        // Force kill after timeout
        const timeout = setTimeout(() => {
          if (this.isRunning) {
            this.serverProcess.kill('SIGKILL');
          }
        }, 5000);

        this.serverProcess.on('close', () => {
          clearTimeout(timeout);
          this.isRunning = false;
          this.serverProcess = null;
          this.startTime = null;
          resolve({
            success: true,
            message: 'Server stopped successfully',
          });
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Restart the backend server
   */
  async restartServer(options = {}) {
    if (this.isRunning) {
      await this.stopServer();
      // Wait a moment before restarting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return this.startServer(options);
  }

  /**
   * Add a log entry
   */
  addLog(type, message) {
    this.logs.push({
      timestamp: new Date().toISOString(),
      type,
      message: message.trim(),
    });

    // Keep logs under max limit
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  /**
   * Get recent logs
   */
  getLogs(count = 50) {
    return this.logs.slice(-count);
  }

  /**
   * Clear logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Check if port is in use
   */
  async isPortInUse(port) {
    try {
      const { stdout } = await execAsync(`lsof -i :${port} -t 2>/dev/null || true`);
      return stdout.trim().length > 0;
    } catch {
      return false;
    }
  }

  /**
   * Kill process on port
   */
  async killProcessOnPort(port) {
    try {
      const { stdout } = await execAsync(`lsof -i :${port} -t 2>/dev/null || true`);
      const pids = stdout.trim().split('\n').filter(Boolean);
      
      for (const pid of pids) {
        await execAsync(`kill -9 ${pid}`);
      }
      
      return pids.length > 0;
    } catch {
      return false;
    }
  }

  /**
   * Get server health
   */
  async getHealth() {
    if (!this.isRunning) {
      return { status: 'offline' };
    }

    try {
      const port = this.config.get('PORT', '3000');
      const { stdout } = await execAsync(`curl -s http://localhost:${port}/api/v1/health`);
      return JSON.parse(stdout);
    } catch {
      return { status: 'error', message: 'Health check failed' };
    }
  }

  /**
   * Run npm command
   */
  async runNpmCommand(command, args = []) {
    return new Promise((resolve, reject) => {
      const proc = spawn('npm', [command, ...args], {
        cwd: process.cwd(),
        stdio: 'inherit',
      });

      proc.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true });
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });

      proc.on('error', reject);
    });
  }

  /**
   * Run database seed
   */
  async runSeed() {
    return this.runNpmCommand('run', ['seed']);
  }

  /**
   * Run lint
   */
  async runLint() {
    return this.runNpmCommand('run', ['lint']);
  }

  /**
   * Run tests
   */
  async runTests() {
    return this.runNpmCommand('test');
  }
}
