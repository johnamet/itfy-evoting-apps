/* eslint-disable no-undef */
/**
 * UI Utilities for Console Application
 * Provides colorful output, prompts, and formatting
 */

import readline from 'readline';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  // Foreground
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Background
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

// Icons
const icons = {
  success: '✓',
  error: '✗',
  warning: '⚠',
  info: 'ℹ',
  arrow: '→',
  bullet: '•',
  star: '★',
  check: '☑',
  cross: '☒',
  heart: '♥',
  server: '🖥',
  database: '🗄',
  user: '👤',
  admin: '👑',
  lock: '🔒',
  unlock: '🔓',
  key: '🔑',
  gear: '⚙',
  rocket: '🚀',
  fire: '🔥',
  thunder: '⚡',
  folder: '📁',
  file: '📄',
  mail: '📧',
  bell: '🔔',
  clock: '🕐',
  calendar: '📅',
  chart: '📊',
  vote: '🗳',
};

export class UI {
  constructor() {
    this.colors = colors;
    this.icons = icons;
    this.currentRl = null;
  }

  /**
   * Clear the console screen
   */
  clear() {
    console.clear();
  }

  /**
   * Print a new line
   */
  newLine(count = 1) {
    for (let i = 0; i < count; i++) {
      console.log('');
    }
  }

  /**
   * Print the application banner
   */
  printBanner() {
    const banner = `
${colors.cyan}${colors.bright}
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   ${colors.yellow}██╗████████╗███████╗██╗   ██╗    ███████╗   ██╗   ██╗ ██████╗ ████████╗███████╗${colors.cyan}   ║
║   ${colors.yellow}██║╚══██╔══╝██╔════╝╚██╗ ██╔╝    ██╔════╝   ██║   ██║██╔═══██╗╚══██╔══╝██╔════╝${colors.cyan}   ║
║   ${colors.yellow}██║   ██║   █████╗   ╚████╔╝     █████╗     ██║   ██║██║   ██║   ██║   █████╗${colors.cyan}     ║
║   ${colors.yellow}██║   ██║   ██╔══╝    ╚██╔╝      ██╔══╝     ╚██╗ ██╔╝██║   ██║   ██║   ██╔══╝${colors.cyan}     ║
║   ${colors.yellow}██║   ██║   ██║        ██║       ███████╗    ╚████╔╝ ╚██████╔╝   ██║   ███████╗${colors.cyan}   ║
║   ${colors.yellow}╚═╝   ╚═╝   ╚═╝        ╚═╝       ╚══════╝     ╚═══╝   ╚═════╝    ╚═╝   ╚══════╝${colors.cyan}   ║
║                                                                           ║
║                    ${colors.white}${colors.bright}Admin Console v1.0.0${colors.reset}${colors.cyan}                                ║
║                    ${colors.dim}Management & Configuration Tool${colors.reset}${colors.cyan}                         ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
${colors.reset}`;
    console.log(banner);
  }

  /**
   * Get the command prompt string
   */
  getPrompt(user = null) {
    if (user) {
      const roleColor = user.role === 'super_admin' ? colors.red : colors.yellow;
      return `${colors.cyan}itfy${colors.reset}:${roleColor}${user.name}${colors.reset}${colors.dim}@${user.role}${colors.reset}> `;
    }
    return `${colors.cyan}itfy${colors.reset}:${colors.dim}guest${colors.reset}> `;
  }

  /**
   * Print colored text
   */
  print(text, color = 'white') {
    console.log(`${colors[color] || ''}${text}${colors.reset}`);
  }

  /**
   * Print success message
   */
  success(message) {
    console.log(`${colors.green}${icons.success} ${message}${colors.reset}`);
  }

  /**
   * Print error message
   */
  error(message) {
    console.log(`${colors.red}${icons.error} ${message}${colors.reset}`);
  }

  /**
   * Print warning message
   */
  warning(message) {
    console.log(`${colors.yellow}${icons.warning} ${message}${colors.reset}`);
  }

  /**
   * Print info message
   */
  info(message) {
    console.log(`${colors.blue}${icons.info} ${message}${colors.reset}`);
  }

  /**
   * Print a header
   */
  header(title, icon = null) {
    const iconStr = icon ? `${icons[icon] || icon} ` : '';
    console.log(`\n${colors.cyan}${colors.bright}═══ ${iconStr}${title} ═══${colors.reset}\n`);
  }

  /**
   * Print a subheader
   */
  subheader(title) {
    console.log(`${colors.white}${colors.bright}${icons.arrow} ${title}${colors.reset}`);
  }

  /**
   * Print a list item
   */
  listItem(text, indent = 0) {
    const padding = '  '.repeat(indent);
    console.log(`${padding}${colors.dim}${icons.bullet}${colors.reset} ${text}`);
  }

  /**
   * Print a key-value pair
   */
  keyValue(key, value, keyWidth = 20) {
    const paddedKey = key.padEnd(keyWidth);
    console.log(`  ${colors.cyan}${paddedKey}${colors.reset}: ${value}`);
  }

  /**
   * Print a table
   */
  table(headers, rows, columnWidths = null) {
    // Calculate column widths if not provided
    if (!columnWidths) {
      columnWidths = headers.map((h, i) => {
        const maxDataWidth = Math.max(...rows.map(r => String(r[i] || '').length));
        return Math.max(h.length, maxDataWidth) + 2;
      });
    }

    // Print header
    const headerRow = headers.map((h, i) => h.padEnd(columnWidths[i])).join('│');
    const separator = columnWidths.map(w => '─'.repeat(w)).join('┼');
    
    console.log(`${colors.cyan}${colors.bright}${headerRow}${colors.reset}`);
    console.log(`${colors.dim}${separator}${colors.reset}`);

    // Print rows
    rows.forEach(row => {
      const dataRow = row.map((cell, i) => String(cell || '').padEnd(columnWidths[i])).join('│');
      console.log(dataRow);
    });
  }

  /**
   * Print a box with content
   */
  box(title, content, width = 60) {
    const topBorder = `╭${'─'.repeat(width - 2)}╮`;
    const bottomBorder = `╰${'─'.repeat(width - 2)}╯`;
    const titleLine = `│ ${colors.bright}${title.padEnd(width - 4)}${colors.reset} │`;
    const separator = `├${'─'.repeat(width - 2)}┤`;

    console.log(`${colors.cyan}${topBorder}${colors.reset}`);
    console.log(`${colors.cyan}${titleLine}${colors.reset}`);
    console.log(`${colors.cyan}${separator}${colors.reset}`);

    const lines = content.split('\n');
    lines.forEach(line => {
      const paddedLine = line.padEnd(width - 4).substring(0, width - 4);
      console.log(`${colors.cyan}│${colors.reset} ${paddedLine} ${colors.cyan}│${colors.reset}`);
    });

    console.log(`${colors.cyan}${bottomBorder}${colors.reset}`);
  }

  /**
   * Print a progress bar
   */
  progressBar(current, total, width = 30, label = '') {
    const percentage = Math.round((current / total) * 100);
    const filled = Math.round((current / total) * width);
    const empty = width - filled;
    
    const bar = `${'█'.repeat(filled)}${'░'.repeat(empty)}`;
    const labelStr = label ? ` ${label}` : '';
    
    process.stdout.write(`\r${colors.cyan}[${bar}]${colors.reset} ${percentage}%${labelStr}`);
    
    if (current === total) {
      console.log('');
    }
  }

  /**
   * Print a spinner (returns stop function)
   */
  spinner(message) {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    
    const interval = setInterval(() => {
      process.stdout.write(`\r${colors.cyan}${frames[i]}${colors.reset} ${message}`);
      i = (i + 1) % frames.length;
    }, 80);

    return {
      stop: (finalMessage = null) => {
        clearInterval(interval);
        process.stdout.write('\r' + ' '.repeat(message.length + 4) + '\r');
        if (finalMessage) {
          console.log(finalMessage);
        }
      }
    };
  }

  /**
   * Ask a question and get input
   */
  async question(prompt, options = {}) {
    const { hidden = false, defaultValue = null, validate = null } = options;
    
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const promptText = defaultValue 
        ? `${colors.yellow}${icons.arrow}${colors.reset} ${prompt} ${colors.dim}[${defaultValue}]${colors.reset}: `
        : `${colors.yellow}${icons.arrow}${colors.reset} ${prompt}: `;

      if (hidden) {
        // For hidden input (passwords)
        process.stdout.write(promptText);
        
        let input = '';
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        const onData = (char) => {
          switch (char) {
            case '\n':
            case '\r':
            case '\u0004': // Ctrl+D
              process.stdin.setRawMode(false);
              process.stdin.pause();
              process.stdin.removeListener('data', onData);
              console.log('');
              rl.close();
              resolve(input || defaultValue);
              break;
            case '\u0003': // Ctrl+C
              process.exit(0);
              break;
            case '\u007F': // Backspace
              if (input.length > 0) {
                input = input.slice(0, -1);
                process.stdout.write('\b \b');
              }
              break;
            default:
              input += char;
              process.stdout.write('*');
              break;
          }
        };

        process.stdin.on('data', onData);
      } else {
        rl.question(promptText, (answer) => {
          rl.close();
          const result = answer.trim() || defaultValue;
          
          if (validate && result) {
            const validationResult = validate(result);
            if (validationResult !== true) {
              this.error(validationResult);
              resolve(this.question(prompt, options));
              return;
            }
          }
          
          resolve(result);
        });
      }
    });
  }

  /**
   * Ask a yes/no confirmation
   */
  async confirm(message, defaultValue = false) {
    const hint = defaultValue ? '[Y/n]' : '[y/N]';
    const answer = await this.question(`${message} ${hint}`, { defaultValue: defaultValue ? 'y' : 'n' });
    return ['y', 'yes', 'true', '1'].includes(answer.toLowerCase());
  }

  /**
   * Show a selection menu
   */
  async select(message, choices) {
    this.info(message);
    this.newLine();
    
    choices.forEach((choice, index) => {
      const num = `${index + 1}`.padStart(2);
      console.log(`  ${colors.cyan}${num}${colors.reset}. ${choice.label || choice}`);
    });
    
    this.newLine();
    const answer = await this.question('Enter your choice', {
      validate: (val) => {
        const num = parseInt(val);
        if (isNaN(num) || num < 1 || num > choices.length) {
          return `Please enter a number between 1 and ${choices.length}`;
        }
        return true;
      }
    });
    
    return choices[parseInt(answer) - 1];
  }

  /**
   * Show help for commands
   */
  showHelp(commands, category = null) {
    if (category) {
      this.header(`${category} Commands`, 'gear');
    } else {
      this.header('Available Commands', 'gear');
    }

    commands.forEach(cmd => {
      const cmdName = `${colors.yellow}${cmd.name}${colors.reset}`;
      const aliases = cmd.aliases ? ` ${colors.dim}(${cmd.aliases.join(', ')})${colors.reset}` : '';
      const requiresAuth = cmd.requiresAuth ? ` ${colors.red}${icons.lock}${colors.reset}` : '';
      const adminOnly = cmd.adminOnly ? ` ${colors.magenta}${icons.admin}${colors.reset}` : '';
      
      console.log(`  ${cmdName}${aliases}${requiresAuth}${adminOnly}`);
      console.log(`    ${colors.dim}${cmd.description}${colors.reset}`);
      
      if (cmd.usage) {
        console.log(`    ${colors.cyan}Usage: ${cmd.usage}${colors.reset}`);
      }
      
      this.newLine();
    });

    console.log(`${colors.dim}${icons.lock} = requires authentication  ${icons.admin} = admin only${colors.reset}`);
  }
}
