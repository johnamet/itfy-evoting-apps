/* eslint-disable no-undef */

/**
 * Main Console Application
 * Orchestrates the CLI interface, authentication, and command routing
 * FIXED: Proper readline handling to prevent double input display
 */

import readline from 'readline';
import { EventEmitter } from 'events';
import { SetupWizard } from './setup/wizard.js';
import { AuthManager } from './auth/manager.js';
import { CommandRouter } from './commands/router.js';
import { UI } from './utils/ui.js';
import { Config } from './utils/config.js';
import { ServerManager } from './server/manager.js';

export class ConsoleApp extends EventEmitter {
  constructor() {
    super();
    this.ui = new UI();
    this.config = new Config();
    this.authManager = null;
    this.commandRouter = null;
    this.serverManager = null;
    this.currentUser = null;
    this.isRunning = false;
    this.rl = null;
  }

  /**
   * Start the console application
   */
  async start() {
    this.ui.clear();
    this.ui.printBanner();
    
    try {
      // Check if this is first run
      const needsSetup = await this.checkFirstRun();
      
      if (needsSetup) {
        await this.runSetupWizard();
      }

      // Load configuration
      await this.config.load();

      // Initialize managers
      this.authManager = new AuthManager(this.config);
      this.serverManager = new ServerManager(this.config);
      this.commandRouter = new CommandRouter(this);

      // Start interactive session
      await this.runInteractiveSession();
    } catch (error) {
      this.ui.error(`Fatal error: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Check if first-time setup is needed
   */
  async checkFirstRun() {
    const envExists = await this.config.envFileExists();
    const hasAdmin = envExists ? await this.checkAdminExists() : false;
    
    return !envExists || !hasAdmin;
  }

  /**
   * Check if any admin user exists in the database
   */
  async checkAdminExists() {
    try {
      // Try to connect to database
      await this.config.load();
      const mongoose = await import('mongoose');
      
      const dbUri = process.env.MONGODB_URI || this.config.get('MONGODB_URI');
      if (!dbUri) return false;

      await mongoose.default.connect(dbUri, { serverSelectionTimeoutMS: 5000 });
      
      // Check for admin users
      const User = mongoose.default.model('User', new mongoose.default.Schema({
        role: String,
        email: String,
        name: String
      }));
      
      const adminCount = await User.countDocuments({
        role: { $in: ['super_admin', 'admin'] }
      });
      
      await mongoose.default.disconnect();
      return adminCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Run the first-time setup wizard
   */
  async runSetupWizard() {
    const wizard = new SetupWizard(this.ui, this.config);
    const setupComplete = await wizard.run();
    
    if (!setupComplete) {
      this.ui.error('Setup cancelled. Cannot continue without configuration.');
      process.exit(1);
    }
    
    this.ui.success('Setup completed successfully!');
    this.ui.newLine();
  }

  /**
   * Run the main interactive session
   * FIXED: Proper readline configuration to prevent double input display
   */
  async runInteractiveSession() {
    this.isRunning = true;
    
    // Clear any lingering input from setup wizard
    process.stdin.pause();
    process.stdin.setRawMode && process.stdin.setRawMode(false);
    
    // Small delay to ensure stdin is clean
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Create readline interface with proper configuration
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: this.ui.getPrompt(),
      terminal: true,
      historySize: 100,
      removeHistoryDuplicates: true,
      // Prevent double echo
      completer: undefined
    });

    // Pass readline reference to UI for proper handling
    this.ui.setReadlineInterface(this.rl);

    // Handle line input
    this.rl.on('line', async (line) => {
      const input = line.trim();
      
      if (input) {
        // Pause readline while processing to prevent interference
        this.rl.pause();
        
        await this.handleInput(input);
        
        // Resume and show prompt
        if (this.isRunning) {
          this.rl.resume();
          this.rl.setPrompt(this.ui.getPrompt(this.currentUser));
          this.rl.prompt();
        }
      } else {
        // Empty input, just show prompt again
        if (this.isRunning) {
          this.rl.prompt();
        }
      }
    });

    // Handle close
    this.rl.on('close', () => {
      this.shutdown();
    });

    // Handle SIGINT (Ctrl+C)
    this.rl.on('SIGINT', () => {
      this.ui.newLine();
      this.ui.warning('Press Ctrl+C again to exit, or type "exit" to quit gracefully');
      this.rl.prompt();
    });

    // Handle SIGTERM
    process.on('SIGTERM', () => {
      this.shutdown();
    });

    // Show initial prompt
    this.ui.info('Welcome to ITFY E-Voting Admin Console');
    this.ui.info('Type "help" for available commands, "login" to authenticate');
    this.ui.newLine();
    this.rl.prompt();
  }

  /**
   * Handle user input
   */
  async handleInput(input) {
    try {
      await this.commandRouter.execute(input, this.currentUser);
    } catch (error) {
      this.ui.error(error.message);
    }
  }

  /**
   * Set the current authenticated user
   */
  setCurrentUser(user) {
    this.currentUser = user;
  }

  /**
   * Clear the current user session
   */
  clearCurrentUser() {
    this.currentUser = null;
  }

  /**
   * Shutdown the console
   */
  shutdown() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    
    // Close readline interface
    if (this.rl) {
      this.rl.close();
    }
    
    this.ui.newLine();
    this.ui.info('Shutting down console...');
    
    // Stop server if running
    if (this.serverManager?.isServerRunning()) {
      this.ui.info('Stopping backend server...');
      try {
        this.serverManager.stopServer();
      } catch (error) {
        // Ignore errors during shutdown
      }
    }
    
    this.ui.success('Goodbye!');
    
    // Force exit after a short delay
    setTimeout(() => {
      process.exit(0);
    }, 100);
  }
}