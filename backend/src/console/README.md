# ITFY E-Voting Admin Console

A powerful command-line interface for managing the ITFY E-Voting backend system. The console provides system administration, configuration management, and server control capabilities.

## Features

- 🚀 **First-Time Setup Wizard** - Interactive setup for database, cache, JWT, email, and first admin account
- 🔐 **Authentication** - Secure login with role-based access control
- 👥 **User Management** - Create, edit, delete, and manage user roles
- 🖥️ **Server Control** - Start, stop, restart the backend server from the console
- 🗄️ **Database Operations** - Status, statistics, seeding, and backup
- ⚙️ **Configuration** - View and modify environment configuration
- 📊 **Event Management** - List and view event details and statistics
- ⚡ **Cache Management** - Clear cache and view cache statistics

## Installation

The console is part of the backend package. No additional installation required.

## Usage

### Starting the Console

```bash
# From the backend directory
npm run console

# Or with babel-node directly
npx babel-node src/console/index.js
```

### First-Time Setup

On first run (when `.env` doesn't exist or no admin exists), the setup wizard will automatically launch:

1. **Environment Configuration** - Set NODE_ENV, PORT, CORS settings
2. **Database Configuration** - Configure MongoDB connection
3. **Cache Configuration** - Configure Redis (optional)
4. **JWT Configuration** - Auto-generate or set custom secrets
5. **Email Configuration** - Configure SMTP settings (optional)
6. **Frontend Configuration** - Set frontend URL
7. **Create Admin** - Create the first super admin account

### Commands

#### General

| Command | Aliases | Description |
|---------|---------|-------------|
| `help` | `h`, `?` | Show available commands |
| `help <command>` | | Show help for specific command |
| `clear` | `cls` | Clear console screen |
| `exit` | `quit`, `q` | Exit the console |
| `version` | `v` | Show version information |
| `setup` | | Run setup wizard again |

#### Authentication

| Command | Aliases | Description |
|---------|---------|-------------|
| `login [email]` | `signin` | Authenticate with email/password |
| `logout` | `signout` | End current session |
| `whoami` | `me` | Show current user info |
| `passwd` | `password` | Change your password |

#### User Management (🔒 Requires Auth)

| Command | Aliases | Description |
|---------|---------|-------------|
| `user:list` | `users` | List all users |
| `user:create` | `user:add` | Create a new user (👑 Admin) |
| `user:view <id\|email>` | `user:show` | View user details |
| `user:edit <id\|email>` | `user:update` | Edit user details (👑 Admin) |
| `user:delete <id\|email>` | `user:rm` | Delete a user (👑 Admin) |
| `user:role <id\|email> <role>` | | Change user role (👑 Admin) |
| `user:reset <id\|email>` | | Reset user password (👑 Admin) |

**User Roles:**
- `super_admin` - Full system access
- `admin` - Administrative access
- `organiser` - Event management
- `moderator` - Content moderation

#### Server Control

| Command | Aliases | Description |
|---------|---------|-------------|
| `server:start` | `start` | Start the backend server |
| `server:stop` | `stop` | Stop the backend server |
| `server:restart` | `restart` | Restart the backend server |
| `server:status` | `status` | Show server status |
| `server:logs` | `logs` | Show server logs |
| `server:health` | `health` | Check server health |

**Options:**
- `--mode=dev|production` - Server mode (default: dev)
- `--silent=true` - Run in background without output
- `--lines=50` - Number of log lines to show

#### Database Operations (🔒 Requires Auth for some)

| Command | Aliases | Description |
|---------|---------|-------------|
| `db:status` | `database` | Show database connection status |
| `db:connect` | | Connect to database |
| `db:disconnect` | | Disconnect from database |
| `db:stats` | `db:info` | Show database statistics |
| `db:seed` | | Run database seeders (👑 Admin) |
| `db:backup` | | Create database backup (👑 Admin) |

#### System Configuration (🔒 Requires Auth)

| Command | Aliases | Description |
|---------|---------|-------------|
| `config:show` | `config` | Show current configuration |
| `config:set <key> <value>` | | Set configuration value (👑 Admin) |
| `config:reload` | | Reload configuration from file |
| `cache:clear` | `cache:flush` | Clear cache (👑 Admin) |
| `cache:stats` | | Show cache statistics |

#### Event Management (🔒 Requires Auth)

| Command | Aliases | Description |
|---------|---------|-------------|
| `event:list` | `events` | List all events |
| `event:view <id\|slug>` | `event:show` | View event details |
| `event:stats` | | Show event statistics |

**List Options:**
- `--status=active|draft|completed` - Filter by status
- `--limit=20` - Number of results
- `--page=1` - Page number

## Examples

### Starting the Server

```bash
# Login first
itfy:guest> login admin@example.com
Password: ********
✓ Welcome back, Admin!

# Start server in development mode
itfy:Admin@super_admin> start

# Or start in production mode
itfy:Admin@super_admin> start --mode=production
```

### Managing Users

```bash
# List all admin users
itfy:Admin@super_admin> user:list --role=admin

# Create a new organiser
itfy:Admin@super_admin> user:create
Full name: John Doe
Email: john@example.com
Select role: 2 (Organiser)
Password: ********
Confirm password: ********
✓ User created successfully!

# Change user role
itfy:Admin@super_admin> user:role john@example.com admin
✓ User role changed from organiser to admin
```

### Database Operations

```bash
# Check database status
itfy:Admin@super_admin> db:status

# View statistics
itfy:Admin@super_admin> db:stats

# Create backup
itfy:Admin@super_admin> db:backup
```

### Configuration Management

```bash
# View all config
itfy:Admin@super_admin> config:show

# Update a value
itfy:Admin@super_admin> config:set PORT 4000
✓ Configuration updated: PORT
⚠ Some changes may require a server restart to take effect.
```

## Security

- Sessions expire after 4 hours of inactivity
- Passwords must be at least 8 characters with uppercase, lowercase, and numbers
- Admin-only commands require `admin` or `super_admin` role
- Sensitive configuration values are masked in output
- Database passwords are never displayed

## Troubleshooting

### Cannot connect to database
- Check if MongoDB is running
- Verify the `MONGODB_URI` in your `.env` file
- Run `db:connect` to test the connection

### Server won't start
- Check if the port is already in use: `server:status`
- The console will offer to kill existing processes on the port
- Check `server:logs` for error messages

### Login fails
- Verify you have an admin/super_admin role
- Check if your account is suspended
- Reset password with `user:reset` (requires another admin)

## Development

The console is built with:
- Node.js with ES modules
- Mongoose for MongoDB
- bcrypt for password hashing
- readline for interactive input

### File Structure

```
src/console/
├── index.js           # Entry point
├── app.js             # Main application
├── setup/
│   └── wizard.js      # First-time setup wizard
├── auth/
│   └── manager.js     # Authentication manager
├── server/
│   └── manager.js     # Server process manager
├── commands/
│   ├── router.js      # Command routing
│   ├── auth.commands.js
│   ├── user.commands.js
│   ├── server.commands.js
│   ├── database.commands.js
│   ├── system.commands.js
│   └── event.commands.js
└── utils/
    ├── ui.js          # UI utilities (colors, tables, prompts)
    └── config.js      # Configuration manager
```

## License

ISC © John Ametepe Agboku
