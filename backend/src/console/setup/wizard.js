/**
 * First-Time Setup Wizard
 * Guides users through initial configuration and admin account creation
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export class SetupWizard {
  constructor(ui, config) {
    this.ui = ui;
    this.config = config;
    this.setupData = {};
  }

  /**
   * Run the complete setup wizard
   */
  async run() {
    this.ui.clear();
    this.ui.printBanner();
    this.ui.newLine();
    
    this.ui.header('First-Time Setup Wizard', 'rocket');
    this.ui.info('Welcome! This wizard will help you configure the ITFY E-Voting system.');
    this.ui.info('You can press Ctrl+C at any time to cancel.');
    this.ui.newLine();

    try {
      // Step 1: Environment setup
      await this.setupEnvironment();

      // Step 2: Database configuration
      await this.setupDatabase();

      // Step 3: Redis/Cache configuration
      await this.setupCache();

      // Step 4: JWT configuration
      await this.setupJWT();

      // Step 5: Email configuration (optional)
      await this.setupEmail();

      // Step 6: Frontend configuration
      await this.setupFrontend();

      // Step 7: Save configuration
      await this.saveConfiguration();

      // Step 8: Create first admin account
      await this.createFirstAdmin();

      // Step 9: Show summary
      await this.showSummary();

      return true;
    } catch (error) {
      if (error.message === 'Setup cancelled') {
        return false;
      }
      throw error;
    }
  }

  /**
   * Step 1: Environment setup
   */
  async setupEnvironment() {
    this.ui.header('Step 1: Environment Configuration', 'gear');
    
    const nodeEnv = await this.ui.select('Select environment type:', [
      { value: 'development', label: 'Development (verbose logging, auto-index)' },
      { value: 'production', label: 'Production (optimized, secure)' },
      { value: 'staging', label: 'Staging (production-like testing)' },
    ]);
    
    this.setupData.NODE_ENV = nodeEnv.value || nodeEnv;

    this.setupData.PORT = await this.ui.question('Server port', { 
      defaultValue: '3000',
      validate: (val) => {
        const port = parseInt(val);
        if (isNaN(port) || port < 1 || port > 65535) {
          return 'Port must be a number between 1 and 65535';
        }
        return true;
      }
    });

    this.setupData.CORS_ORIGIN = await this.ui.question('CORS origin (comma-separated for multiple)', {
      defaultValue: '*'
    });

    this.ui.success('Environment configuration complete!');
    this.ui.newLine();
  }

  /**
   * Step 2: Database configuration
   */
  async setupDatabase() {
    this.ui.header('Step 2: Database Configuration', 'database');
    this.ui.info('MongoDB is required for ITFY E-Voting.');
    this.ui.newLine();

    const useLocal = await this.ui.confirm('Use local MongoDB (localhost)?', true);

    if (useLocal) {
      const dbName = await this.ui.question('Database name', { defaultValue: 'itfy-evoting' });
      this.setupData.MONGODB_URI = `mongodb://localhost:27017/${dbName}`;
    } else {
      this.ui.info('Enter your MongoDB connection string (e.g., mongodb+srv://user:pass@cluster.mongodb.net/db)');
      this.setupData.MONGODB_URI = await this.ui.question('MongoDB URI', {
        validate: (val) => {
          if (!val.startsWith('mongodb://') && !val.startsWith('mongodb+srv://')) {
            return 'URI must start with mongodb:// or mongodb+srv://';
          }
          return true;
        }
      });
    }

    // Test database connection
    const spinner = this.ui.spinner('Testing database connection...');
    
    try {
      await mongoose.connect(this.setupData.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      await mongoose.disconnect();
      spinner.stop();
      this.ui.success('Database connection successful!');
    } catch (error) {
      spinner.stop();
      this.ui.error(`Database connection failed: ${error.message}`);
      
      const retry = await this.ui.confirm('Would you like to re-enter the database URI?', true);
      if (retry) {
        return this.setupDatabase();
      } else {
        this.ui.warning('Proceeding without database verification. Please ensure MongoDB is available when starting the server.');
      }
    }

    this.ui.newLine();
  }

  /**
   * Step 3: Redis/Cache configuration
   */
  async setupCache() {
    this.ui.header('Step 3: Cache Configuration', 'thunder');
    this.ui.info('Redis is used for caching, rate limiting, and session management.');
    this.ui.info('An in-memory fallback is available if Redis is not configured.');
    this.ui.newLine();

    const useRedis = await this.ui.confirm('Configure Redis?', true);

    if (useRedis) {
      const useLocal = await this.ui.confirm('Use local Redis (localhost)?', true);

      if (useLocal) {
        this.setupData.REDIS_URL = 'redis://localhost:6379';
      } else {
        this.setupData.REDIS_URL = await this.ui.question('Redis URL', {
          defaultValue: 'redis://localhost:6379',
          validate: (val) => {
            if (!val.startsWith('redis://') && !val.startsWith('rediss://')) {
              return 'URL must start with redis:// or rediss://';
            }
            return true;
          }
        });
      }
    } else {
      this.setupData.REDIS_URL = '';
      this.ui.warning('Redis not configured. Using in-memory cache (not recommended for production).');
    }

    this.ui.success('Cache configuration complete!');
    this.ui.newLine();
  }

  /**
   * Step 4: JWT configuration
   */
  async setupJWT() {
    this.ui.header('Step 4: JWT Security Configuration', 'key');
    this.ui.info('JWT tokens are used for authentication.');
    this.ui.newLine();

    const generateSecrets = await this.ui.confirm('Auto-generate secure secrets?', true);

    if (generateSecrets) {
      this.setupData.JWT_SECRET = this.config.generateSecret(64);
      this.setupData.JWT_REFRESH_SECRET = this.config.generateSecret(64);
      this.ui.success('Secure secrets generated!');
    } else {
      this.setupData.JWT_SECRET = await this.ui.question('JWT Secret (min 32 chars)', {
        hidden: true,
        validate: (val) => {
          if (val.length < 32) {
            return 'Secret must be at least 32 characters long';
          }
          return true;
        }
      });
      
      this.setupData.JWT_REFRESH_SECRET = await this.ui.question('JWT Refresh Secret (min 32 chars)', {
        hidden: true,
        validate: (val) => {
          if (val.length < 32) {
            return 'Secret must be at least 32 characters long';
          }
          return true;
        }
      });
    }

    this.setupData.JWT_EXPIRATION = await this.ui.question('Access token expiration', {
      defaultValue: '15m'
    });

    this.setupData.JWT_REFRESH_EXPIRATION = await this.ui.question('Refresh token expiration', {
      defaultValue: '7d'
    });

    this.ui.success('JWT configuration complete!');
    this.ui.newLine();
  }

  /**
   * Step 5: Email configuration
   */
  async setupEmail() {
    this.ui.header('Step 5: Email Configuration (Optional)', 'mail');
    this.ui.info('Email is used for verification, password reset, and notifications.');
    this.ui.newLine();

    const configureEmail = await this.ui.confirm('Configure email now?', false);

    if (configureEmail) {
      this.setupData.EMAIL_HOST = await this.ui.question('SMTP Host', {
        defaultValue: 'smtp.gmail.com'
      });

      this.setupData.EMAIL_PORT = await this.ui.question('SMTP Port', {
        defaultValue: '587'
      });

      this.setupData.EMAIL_USER = await this.ui.question('SMTP Username/Email');
      
      this.setupData.EMAIL_PASS = await this.ui.question('SMTP Password/App Password', {
        hidden: true
      });

      this.setupData.EMAIL_FROM = await this.ui.question('From email address', {
        defaultValue: this.setupData.EMAIL_USER || 'noreply@itfy-evoting.com'
      });

      this.ui.success('Email configuration complete!');
    } else {
      this.ui.warning('Email not configured. Some features will be unavailable.');
    }

    this.ui.newLine();
  }

  /**
   * Step 6: Frontend configuration
   */
  async setupFrontend() {
    this.ui.header('Step 6: Frontend Configuration', 'folder');
    
    this.setupData.FRONTEND_URL = await this.ui.question('Frontend URL', {
      defaultValue: 'http://localhost:3001'
    });

    this.ui.success('Frontend configuration complete!');
    this.ui.newLine();
  }

  /**
   * Step 7: Save configuration
   */
  async saveConfiguration() {
    this.ui.header('Saving Configuration', 'file');
    
    const spinner = this.ui.spinner('Writing configuration to .env file...');
    
    try {
      await this.config.save(this.setupData);
      spinner.stop();
      this.ui.success('Configuration saved to .env file!');
    } catch (error) {
      spinner.stop();
      throw new Error(`Failed to save configuration: ${error.message}`);
    }

    this.ui.newLine();
  }

  /**
   * Step 8: Create first admin account
   */
  async createFirstAdmin() {
    this.ui.header('Step 7: Create Super Admin Account', 'admin');
    this.ui.info('Create the first administrator account for the system.');
    this.ui.newLine();

    const adminData = {
      name: await this.ui.question('Admin full name', {
        validate: (val) => {
          if (val.length < 2) return 'Name must be at least 2 characters';
          return true;
        }
      }),
      email: await this.ui.question('Admin email', {
        validate: (val) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) return 'Please enter a valid email address';
          return true;
        }
      }),
    };

    // Password with confirmation
    let passwordMatch = false;
    while (!passwordMatch) {
      adminData.password = await this.ui.question('Admin password (min 8 chars)', {
        hidden: true,
        validate: (val) => {
          if (val.length < 8) return 'Password must be at least 8 characters';
          if (!/[A-Z]/.test(val)) return 'Password must contain at least one uppercase letter';
          if (!/[a-z]/.test(val)) return 'Password must contain at least one lowercase letter';
          if (!/[0-9]/.test(val)) return 'Password must contain at least one number';
          return true;
        }
      });

      const confirmPassword = await this.ui.question('Confirm password', { hidden: true });
      
      if (adminData.password === confirmPassword) {
        passwordMatch = true;
      } else {
        this.ui.error('Passwords do not match. Please try again.');
      }
    }

    // Create admin in database
    const spinner = this.ui.spinner('Creating admin account...');

    try {
      await mongoose.connect(this.setupData.MONGODB_URI);

      // Create User model
      const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password_hash: { type: String, required: true },
        role: { type: String, required: true },
        permissions: { type: [String], default: ['read', 'write', 'update', 'delete', 'super'] },
        email_verified: { type: Boolean, default: true },
        status: { type: String, default: 'active' },
      }, { timestamps: true });

      const User = mongoose.models.User || mongoose.model('User', userSchema);

      // Check if admin already exists
      const existingAdmin = await User.findOne({ email: adminData.email });
      if (existingAdmin) {
        spinner.stop();
        this.ui.warning(`Admin with email ${adminData.email} already exists. Skipping creation.`);
        await mongoose.disconnect();
        return;
      }

      // Hash password
      const passwordHash = await bcrypt.hash(adminData.password, 12);

      // Create admin user
      await User.create({
        name: adminData.name,
        email: adminData.email,
        password_hash: passwordHash,
        role: 'super_admin',
        permissions: ['read', 'write', 'update', 'delete', 'super'],
        email_verified: true,
        status: 'active',
      });

      await mongoose.disconnect();
      
      spinner.stop();
      this.ui.success('Super admin account created successfully!');
      
      this.adminData = adminData;
    } catch (error) {
      spinner.stop();
      throw new Error(`Failed to create admin account: ${error.message}`);
    }

    this.ui.newLine();
  }

  /**
   * Step 9: Show summary
   */
  async showSummary() {
    this.ui.header('Setup Complete!', 'star');
    
    const summary = `
Environment: ${this.setupData.NODE_ENV}
Server Port: ${this.setupData.PORT}
Database:    ${this.config.maskSensitive(this.setupData.MONGODB_URI)}
Cache:       ${this.setupData.REDIS_URL ? this.config.maskSensitive(this.setupData.REDIS_URL) : 'In-memory'}
Admin Email: ${this.adminData?.email || 'N/A'}

You can now:
  1. Run 'npm run dev' to start the development server
  2. Use 'npm run console' to access this admin console
  3. Login with your admin credentials
`;

    this.ui.box('Configuration Summary', summary, 70);
    this.ui.newLine();
    
    this.ui.info('The setup is complete. Press Enter to continue to the console...');
    await this.ui.question('');
  }
}
