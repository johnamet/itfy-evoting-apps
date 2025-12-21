/**
 * Command Router
 * Routes console commands to appropriate handlers
 */

import { AuthCommands } from './auth.commands.js';
import { UserCommands } from './user.commands.js';
import { SystemCommands } from './system.commands.js';
import { ServerCommands } from './server.commands.js';
import { DatabaseCommands } from './database.commands.js';
import { EventCommands } from './event.commands.js';

export class CommandRouter {
  constructor(app) {
    this.app = app;
    this.ui = app.ui;
    this.config = app.config;
    this.authManager = app.authManager;
    this.serverManager = app.serverManager;

    // Initialize command handlers
    this.authCommands = new AuthCommands(this);
    this.userCommands = new UserCommands(this);
    this.systemCommands = new SystemCommands(this);
    this.serverCommands = new ServerCommands(this);
    this.databaseCommands = new DatabaseCommands(this);
    this.eventCommands = new EventCommands(this);

    // Register all commands
    this.commands = this.registerCommands();
  }

  /**
   * Register all available commands
   */
  registerCommands() {
    return {
      // General commands
      help: {
        name: 'help',
        aliases: ['h', '?'],
        description: 'Show available commands',
        usage: 'help [command]',
        handler: async (args) => this.showHelp(args[0]),
      },
      clear: {
        name: 'clear',
        aliases: ['cls'],
        description: 'Clear the console screen',
        handler: () => this.ui.clear(),
      },
      exit: {
        name: 'exit',
        aliases: ['quit', 'q'],
        description: 'Exit the console',
        handler: () => this.app.shutdown(),
      },
      version: {
        name: 'version',
        aliases: ['v'],
        description: 'Show version information',
        handler: () => this.showVersion(),
      },

      // Auth commands
      login: {
        name: 'login',
        aliases: ['signin'],
        description: 'Authenticate with email and password',
        usage: 'login [email]',
        handler: (args) => this.authCommands.login(args[0]),
      },
      logout: {
        name: 'logout',
        aliases: ['signout'],
        description: 'End current session',
        requiresAuth: true,
        handler: () => this.authCommands.logout(),
      },
      whoami: {
        name: 'whoami',
        aliases: ['me'],
        description: 'Show current user info',
        requiresAuth: true,
        handler: () => this.authCommands.whoami(),
      },
      passwd: {
        name: 'passwd',
        aliases: ['password', 'changepassword'],
        description: 'Change your password',
        requiresAuth: true,
        handler: () => this.authCommands.changePassword(),
      },

      // User management commands
      'user:list': {
        name: 'user:list',
        aliases: ['users', 'user:ls'],
        description: 'List all users',
        usage: 'user:list [--role=admin] [--limit=10]',
        requiresAuth: true,
        handler: (args) => this.userCommands.listUsers(args),
      },
      'user:create': {
        name: 'user:create',
        aliases: ['user:add'],
        description: 'Create a new user',
        usage: 'user:create',
        requiresAuth: true,
        adminOnly: true,
        handler: () => this.userCommands.createUser(),
      },
      'user:view': {
        name: 'user:view',
        aliases: ['user:show', 'user:get'],
        description: 'View user details',
        usage: 'user:view <email|id>',
        requiresAuth: true,
        handler: (args) => this.userCommands.viewUser(args[0]),
      },
      'user:edit': {
        name: 'user:edit',
        aliases: ['user:update'],
        description: 'Edit user details',
        usage: 'user:edit <email|id>',
        requiresAuth: true,
        adminOnly: true,
        handler: (args) => this.userCommands.editUser(args[0]),
      },
      'user:delete': {
        name: 'user:delete',
        aliases: ['user:rm', 'user:remove'],
        description: 'Delete a user',
        usage: 'user:delete <email|id>',
        requiresAuth: true,
        adminOnly: true,
        handler: (args) => this.userCommands.deleteUser(args[0]),
      },
      'user:role': {
        name: 'user:role',
        aliases: ['user:setrole'],
        description: 'Change user role',
        usage: 'user:role <email|id> <role>',
        requiresAuth: true,
        adminOnly: true,
        handler: (args) => this.userCommands.changeRole(args[0], args[1]),
      },
      'user:reset': {
        name: 'user:reset',
        aliases: ['user:resetpass'],
        description: 'Reset user password',
        usage: 'user:reset <email|id>',
        requiresAuth: true,
        adminOnly: true,
        handler: (args) => this.userCommands.resetPassword(args[0]),
      },

      // Server commands
      'server:start': {
        name: 'server:start',
        aliases: ['start'],
        description: 'Start the backend server',
        usage: 'server:start [--mode=dev|production]',
        handler: (args) => this.serverCommands.start(args),
      },
      'server:stop': {
        name: 'server:stop',
        aliases: ['stop'],
        description: 'Stop the backend server',
        handler: () => this.serverCommands.stop(),
      },
      'server:restart': {
        name: 'server:restart',
        aliases: ['restart'],
        description: 'Restart the backend server',
        handler: (args) => this.serverCommands.restart(args),
      },
      'server:status': {
        name: 'server:status',
        aliases: ['status'],
        description: 'Show server status',
        handler: () => this.serverCommands.status(),
      },
      'server:logs': {
        name: 'server:logs',
        aliases: ['logs'],
        description: 'Show server logs',
        usage: 'server:logs [--lines=50]',
        handler: (args) => this.serverCommands.logs(args),
      },
      'server:health': {
        name: 'server:health',
        aliases: ['health'],
        description: 'Check server health',
        handler: () => this.serverCommands.health(),
      },

      // Database commands
      'db:status': {
        name: 'db:status',
        aliases: ['database'],
        description: 'Show database connection status',
        handler: () => this.databaseCommands.status(),
      },
      'db:connect': {
        name: 'db:connect',
        description: 'Connect to database',
        handler: () => this.databaseCommands.connect(),
      },
      'db:disconnect': {
        name: 'db:disconnect',
        description: 'Disconnect from database',
        handler: () => this.databaseCommands.disconnect(),
      },
      'db:stats': {
        name: 'db:stats',
        aliases: ['db:info'],
        description: 'Show database statistics',
        requiresAuth: true,
        handler: () => this.databaseCommands.stats(),
      },
      'db:seed': {
        name: 'db:seed',
        description: 'Run database seeders',
        requiresAuth: true,
        adminOnly: true,
        handler: () => this.databaseCommands.seed(),
      },
      'db:backup': {
        name: 'db:backup',
        description: 'Create database backup',
        requiresAuth: true,
        adminOnly: true,
        handler: () => this.databaseCommands.backup(),
      },

      // System commands
      'config:show': {
        name: 'config:show',
        aliases: ['config'],
        description: 'Show current configuration',
        requiresAuth: true,
        handler: () => this.systemCommands.showConfig(),
      },
      'config:set': {
        name: 'config:set',
        description: 'Set a configuration value',
        usage: 'config:set <key> <value>',
        requiresAuth: true,
        adminOnly: true,
        handler: (args) => this.systemCommands.setConfig(args[0], args.slice(1).join(' ')),
      },
      'config:reload': {
        name: 'config:reload',
        description: 'Reload configuration from file',
        requiresAuth: true,
        handler: () => this.systemCommands.reloadConfig(),
      },
      'cache:clear': {
        name: 'cache:clear',
        aliases: ['cache:flush'],
        description: 'Clear cache',
        requiresAuth: true,
        adminOnly: true,
        handler: () => this.systemCommands.clearCache(),
      },
      'cache:stats': {
        name: 'cache:stats',
        description: 'Show cache statistics',
        requiresAuth: true,
        handler: () => this.systemCommands.cacheStats(),
      },

      // Event commands
      'event:list': {
        name: 'event:list',
        aliases: ['events'],
        description: 'List all events',
        usage: 'event:list [--status=active]',
        requiresAuth: true,
        handler: (args) => this.eventCommands.listEvents(args),
      },
      'event:view': {
        name: 'event:view',
        aliases: ['event:show'],
        description: 'View event details',
        usage: 'event:view <id>',
        requiresAuth: true,
        handler: (args) => this.eventCommands.viewEvent(args[0]),
      },
      'event:stats': {
        name: 'event:stats',
        description: 'Show event statistics',
        requiresAuth: true,
        handler: () => this.eventCommands.stats(),
      },

      // Misc commands
      setup: {
        name: 'setup',
        description: 'Run setup wizard again',
        handler: () => this.app.runSetupWizard(),
      },
    };
  }

  /**
   * Execute a command
   */
  async execute(input, user) {
    const [commandName, ...args] = this.parseInput(input);
    
    if (!commandName) return;

    // Find command (including aliases)
    const command = this.findCommand(commandName);

    if (!command) {
      this.ui.error(`Unknown command: ${commandName}`);
      this.ui.info('Type "help" for available commands');
      return;
    }

    // Check authentication requirement
    if (command.requiresAuth && !this.authManager.isAuthenticated()) {
      this.ui.error('This command requires authentication. Please login first.');
      return;
    }

    // Check admin requirement
    if (command.adminOnly && !this.authManager.hasRole('admin')) {
      this.ui.error('This command requires admin privileges.');
      return;
    }

    try {
      await command.handler(args);
    } catch (error) {
      this.ui.error(`Command failed: ${error.message}`);
    }
  }

  /**
   * Parse input into command and arguments
   */
  parseInput(input) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (const char of input) {
      if ((char === '"' || char === "'") && !inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar && inQuotes) {
        inQuotes = false;
        quoteChar = '';
      } else if (char === ' ' && !inQuotes) {
        if (current) {
          parts.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }

    if (current) {
      parts.push(current);
    }

    return parts;
  }

  /**
   * Find command by name or alias
   */
  findCommand(name) {
    const lowerName = name.toLowerCase();
    
    // Check direct match
    if (this.commands[lowerName]) {
      return this.commands[lowerName];
    }

    // Check aliases
    for (const cmd of Object.values(this.commands)) {
      if (cmd.aliases && cmd.aliases.includes(lowerName)) {
        return cmd;
      }
    }

    return null;
  }

  /**
   * Show help
   */
  showHelp(commandName) {
    if (commandName) {
      const command = this.findCommand(commandName);
      if (command) {
        this.ui.header(`Help: ${command.name}`, 'info');
        this.ui.keyValue('Description', command.description);
        if (command.aliases) {
          this.ui.keyValue('Aliases', command.aliases.join(', '));
        }
        if (command.usage) {
          this.ui.keyValue('Usage', command.usage);
        }
        if (command.requiresAuth) {
          this.ui.keyValue('Requires Auth', 'Yes');
        }
        if (command.adminOnly) {
          this.ui.keyValue('Admin Only', 'Yes');
        }
      } else {
        this.ui.error(`Command not found: ${commandName}`);
      }
      return;
    }

    // Group commands by category
    const categories = {
      'General': ['help', 'clear', 'exit', 'version', 'setup'],
      'Authentication': ['login', 'logout', 'whoami', 'passwd'],
      'User Management': ['user:list', 'user:create', 'user:view', 'user:edit', 'user:delete', 'user:role', 'user:reset'],
      'Server': ['server:start', 'server:stop', 'server:restart', 'server:status', 'server:logs', 'server:health'],
      'Database': ['db:status', 'db:connect', 'db:disconnect', 'db:stats', 'db:seed', 'db:backup'],
      'System': ['config:show', 'config:set', 'config:reload', 'cache:clear', 'cache:stats'],
      'Events': ['event:list', 'event:view', 'event:stats'],
    };

    this.ui.header('ITFY E-Voting Admin Console', 'rocket');
    
    for (const [category, commandNames] of Object.entries(categories)) {
      const categoryCommands = commandNames
        .map(name => this.commands[name])
        .filter(Boolean);
      
      if (categoryCommands.length > 0) {
        this.ui.showHelp(categoryCommands, category);
        this.ui.newLine();
      }
    }
  }

  /**
   * Show version information
   */
  showVersion() {
    this.ui.header('Version Information', 'info');
    this.ui.keyValue('Console Version', '1.0.0');
    this.ui.keyValue('Backend Version', '1.1.0');
    this.ui.keyValue('Node.js', process.version);
    this.ui.keyValue('Platform', process.platform);
    this.ui.keyValue('Architecture', process.arch);
  }
}
