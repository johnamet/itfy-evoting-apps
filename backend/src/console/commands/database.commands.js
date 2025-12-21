/**
 * Database Commands
 * Handles database operations and status
 */

import mongoose from 'mongoose';

export class DatabaseCommands {
  constructor(router) {
    this.router = router;
    this.ui = router.ui;
    this.config = router.config;
    this.serverManager = router.serverManager;
  }

  /**
   * Show database status
   */
  async status() {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const state = states[mongoose.connection.readyState] || 'unknown';
    
    this.ui.header('Database Status', 'database');
    
    const stateIcon = state === 'connected' ? '●' : '○';
    const stateColor = state === 'connected' ? 'green' : 'red';
    
    this.ui.print(`  Status: ${stateIcon} ${state}`, stateColor);
    this.ui.newLine();

    this.ui.keyValue('URI', this.config.maskSensitive(this.config.get('MONGODB_URI', '')), 20);
    
    if (mongoose.connection.readyState === 1) {
      this.ui.keyValue('Host', mongoose.connection.host, 20);
      this.ui.keyValue('Port', mongoose.connection.port, 20);
      this.ui.keyValue('Database', mongoose.connection.name, 20);
    }
  }

  /**
   * Connect to database
   */
  async connect() {
    if (mongoose.connection.readyState === 1) {
      this.ui.info('Already connected to database');
      return;
    }

    const mongoUri = this.config.get('MONGODB_URI');
    if (!mongoUri) {
      this.ui.error('MongoDB URI not configured');
      return;
    }

    const spinner = this.ui.spinner('Connecting to database...');

    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
      });
      
      spinner.stop();
      this.ui.success('Connected to database');
      this.ui.keyValue('Host', mongoose.connection.host);
      this.ui.keyValue('Database', mongoose.connection.name);
    } catch (error) {
      spinner.stop();
      this.ui.error(`Connection failed: ${error.message}`);
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    if (mongoose.connection.readyState !== 1) {
      this.ui.info('Not connected to database');
      return;
    }

    const spinner = this.ui.spinner('Disconnecting...');

    try {
      await mongoose.disconnect();
      spinner.stop();
      this.ui.success('Disconnected from database');
    } catch (error) {
      spinner.stop();
      this.ui.error(`Disconnect failed: ${error.message}`);
    }
  }

  /**
   * Show database statistics
   */
  async stats() {
    await this.ensureConnection();

    const spinner = this.ui.spinner('Fetching statistics...');

    try {
      const db = mongoose.connection.db;
      const stats = await db.stats();
      const collections = await db.listCollections().toArray();

      spinner.stop();

      this.ui.header('Database Statistics', 'chart');
      
      this.ui.keyValue('Database', stats.db, 25);
      this.ui.keyValue('Collections', stats.collections, 25);
      this.ui.keyValue('Documents', stats.objects?.toLocaleString() || 'N/A', 25);
      this.ui.keyValue('Data Size', this.formatBytes(stats.dataSize), 25);
      this.ui.keyValue('Storage Size', this.formatBytes(stats.storageSize), 25);
      this.ui.keyValue('Indexes', stats.indexes, 25);
      this.ui.keyValue('Index Size', this.formatBytes(stats.indexSize), 25);

      // Collection details
      this.ui.newLine();
      this.ui.subheader('Collections');

      const collectionStats = await Promise.all(
        collections.map(async (col) => {
          try {
            const count = await db.collection(col.name).countDocuments();
            return { name: col.name, count };
          } catch {
            return { name: col.name, count: '?' };
          }
        })
      );

      const headers = ['Collection', 'Documents'];
      const rows = collectionStats
        .sort((a, b) => (b.count || 0) - (a.count || 0))
        .map(col => [col.name, col.count.toLocaleString()]);

      this.ui.table(headers, rows);
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to get statistics: ${error.message}`);
    }
  }

  /**
   * Run database seeders
   */
  async seed() {
    const confirm = await this.ui.confirm('Run database seeders? This may modify data.', false);
    if (!confirm) {
      this.ui.info('Cancelled');
      return;
    }

    this.ui.info('Running seeders...');
    this.ui.newLine();

    try {
      await this.serverManager.runSeed();
      this.ui.success('Seeders completed');
    } catch (error) {
      this.ui.error(`Seeding failed: ${error.message}`);
    }
  }

  /**
   * Create database backup
   */
  async backup() {
    await this.ensureConnection();

    const mongoUri = this.config.get('MONGODB_URI');
    const dbName = mongoose.connection.name;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = `./backups/${dbName}-${timestamp}`;

    this.ui.header('Database Backup', 'folder');
    this.ui.keyValue('Database', dbName, 20);
    this.ui.keyValue('Output', backupDir, 20);
    this.ui.newLine();

    const confirm = await this.ui.confirm('Create backup?', true);
    if (!confirm) {
      this.ui.info('Cancelled');
      return;
    }

    this.ui.info('Creating backup...');
    this.ui.info('Note: mongodump must be installed for this to work.');
    this.ui.newLine();

    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);

      // Create backup directory
      const fs = await import('fs/promises');
      await fs.mkdir(backupDir, { recursive: true });

      // Run mongodump
      await execAsync(`mongodump --uri="${mongoUri}" --out="${backupDir}"`);

      this.ui.success(`Backup created at: ${backupDir}`);
    } catch (error) {
      this.ui.error(`Backup failed: ${error.message}`);
      this.ui.info('Make sure mongodump is installed (part of MongoDB Database Tools)');
    }
  }

  /**
   * Ensure database connection
   */
  async ensureConnection() {
    if (mongoose.connection.readyState !== 1) {
      const mongoUri = this.config.get('MONGODB_URI');
      if (!mongoUri) {
        throw new Error('MongoDB URI not configured');
      }
      await mongoose.connect(mongoUri);
    }
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
}
