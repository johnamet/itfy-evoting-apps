/**
 * Server Commands
 * Controls the backend server (start, stop, restart, status)
 */

export class ServerCommands {
  constructor(router) {
    this.router = router;
    this.ui = router.ui;
    this.serverManager = router.serverManager;
    this.config = router.config;
  }

  /**
   * Start the server
   */
  async start(args) {
    const options = this.parseArgs(args);
    const mode = options.mode || 'dev';

    // Check if already running
    if (this.serverManager.isServerRunning()) {
      this.ui.warning('Server is already running');
      await this.status();
      return;
    }

    // Check if port is in use
    const port = this.config.get('PORT', '3000');
    const portInUse = await this.serverManager.isPortInUse(port);
    
    if (portInUse) {
      this.ui.warning(`Port ${port} is already in use`);
      const kill = await this.ui.confirm('Kill existing process?', false);
      
      if (kill) {
        await this.serverManager.killProcessOnPort(port);
        this.ui.success('Killed existing process');
      } else {
        this.ui.info('Server start cancelled');
        return;
      }
    }

    this.ui.header('Starting Server', 'rocket');
    this.ui.keyValue('Mode', mode, 15);
    this.ui.keyValue('Port', port, 15);
    this.ui.newLine();

    const silent = options.silent === 'true' || options.silent === true;

    try {
      if (!silent) {
        this.ui.info('Server output will be shown below. Press Ctrl+C to stop.');
        this.ui.newLine();
      }

      const result = await this.serverManager.startServer({ 
        mode: mode === 'production' ? 'production' : 'dev',
        silent 
      });
      
      if (silent) {
        this.ui.success(`Server started (PID: ${result.pid})`);
        this.ui.info(`Running in background. Use 'server:logs' to view output.`);
      }
    } catch (error) {
      this.ui.error(`Failed to start server: ${error.message}`);
    }
  }

  /**
   * Stop the server
   */
  async stop() {
    if (!this.serverManager.isServerRunning()) {
      this.ui.warning('Server is not running');
      return;
    }

    const confirm = await this.ui.confirm('Stop the server?', true);
    if (!confirm) {
      this.ui.info('Cancelled');
      return;
    }

    const spinner = this.ui.spinner('Stopping server...');

    try {
      await this.serverManager.stopServer();
      spinner.stop();
      this.ui.success('Server stopped');
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to stop server: ${error.message}`);
    }
  }

  /**
   * Restart the server
   */
  async restart(args) {
    const options = this.parseArgs(args);
    const mode = options.mode || 'dev';

    this.ui.info('Restarting server...');

    try {
      const result = await this.serverManager.restartServer({ 
        mode: mode === 'production' ? 'production' : 'dev',
        silent: options.silent === 'true' 
      });
      
      this.ui.success(`Server restarted (PID: ${result.pid})`);
    } catch (error) {
      this.ui.error(`Failed to restart server: ${error.message}`);
    }
  }

  /**
   * Show server status
   */
  async status() {
    const status = this.serverManager.getStatus();

    this.ui.header('Server Status', 'server');
    
    const statusColor = status.running ? 'green' : 'red';
    const statusIcon = status.running ? '●' : '○';
    
    this.ui.print(`  Status: ${statusIcon} ${status.running ? 'Running' : 'Stopped'}`, statusColor);
    this.ui.newLine();

    if (status.running) {
      this.ui.keyValue('PID', status.pid, 15);
      this.ui.keyValue('Port', status.port, 15);
      this.ui.keyValue('Environment', status.environment, 15);
      this.ui.keyValue('Uptime', this.formatUptime(status.uptime), 15);

      // Try to get health
      const health = await this.serverManager.getHealth();
      if (health.status === 'ok') {
        this.ui.newLine();
        this.ui.subheader('Services');
        for (const [service, state] of Object.entries(health.services || {})) {
          const serviceIcon = state === 'connected' || state === 'ready' ? '✓' : '○';
          this.ui.listItem(`${service}: ${state} ${serviceIcon}`);
        }
      }
    } else {
      this.ui.keyValue('Port (configured)', status.port, 15);
      this.ui.keyValue('Environment', status.environment, 15);
    }
  }

  /**
   * Show server logs
   */
  async logs(args) {
    const options = this.parseArgs(args);
    const lines = parseInt(options.lines) || 50;

    const logs = this.serverManager.getLogs(lines);

    if (logs.length === 0) {
      this.ui.info('No logs available');
      return;
    }

    this.ui.header(`Server Logs (last ${logs.length} entries)`, 'file');

    for (const log of logs) {
      const timestamp = new Date(log.timestamp).toLocaleTimeString();
      let color = 'white';
      
      if (log.type === 'stderr' || log.type === 'error') {
        color = 'red';
      } else if (log.message.includes('error') || log.message.includes('Error')) {
        color = 'red';
      } else if (log.message.includes('warn') || log.message.includes('Warning')) {
        color = 'yellow';
      } else if (log.type === 'system') {
        color = 'cyan';
      }

      this.ui.print(`[${timestamp}] ${log.message}`, color);
    }

    if (options.follow === 'true') {
      this.ui.newLine();
      this.ui.info('Following logs... Press Ctrl+C to stop.');
      // Note: For full follow functionality, we'd need to implement streaming
    }
  }

  /**
   * Check server health
   */
  async health() {
    const spinner = this.ui.spinner('Checking health...');

    try {
      const health = await this.serverManager.getHealth();
      spinner.stop();

      if (health.status === 'offline') {
        this.ui.warning('Server is offline');
        return;
      }

      if (health.status === 'error') {
        this.ui.error(health.message || 'Health check failed');
        return;
      }

      this.ui.header('Server Health', 'heart');
      this.ui.keyValue('Status', health.status, 20);
      this.ui.keyValue('Timestamp', health.timestamp, 20);
      
      if (health.uptime) {
        this.ui.keyValue('Uptime', this.formatUptime(health.uptime), 20);
      }
      
      this.ui.keyValue('Environment', health.environment, 20);

      if (health.services) {
        this.ui.newLine();
        this.ui.subheader('Services');
        
        for (const [service, state] of Object.entries(health.services)) {
          const icon = state === 'connected' || state === 'ready' ? '✓' : '○';
          const color = state === 'connected' || state === 'ready' ? 'green' : 'yellow';
          this.ui.print(`  ${icon} ${service}: ${state}`, color);
        }
      }
    } catch (error) {
      spinner.stop();
      this.ui.error(`Health check failed: ${error.message}`);
    }
  }

  /**
   * Format uptime in human readable format
   */
  formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${secs}s`);

    return parts.join(' ');
  }

  /**
   * Parse command arguments
   */
  parseArgs(args) {
    const options = {};
    for (const arg of args) {
      if (arg.startsWith('--')) {
        const [key, value] = arg.slice(2).split('=');
        options[key] = value || true;
      }
    }
    return options;
  }
}
