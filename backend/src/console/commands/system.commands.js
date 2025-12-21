/**
 * System Commands
 * Handles configuration and system-level operations
 */

import mongoose from 'mongoose';

export class SystemCommands {
  constructor(router) {
    this.router = router;
    this.ui = router.ui;
    this.config = router.config;
  }

  /**
   * Show current configuration
   */
  async showConfig() {
    this.ui.header('System Configuration', 'gear');
    
    const summary = this.config.getSummary();

    // Server section
    this.ui.subheader('Server');
    this.ui.keyValue('Environment', summary.server.nodeEnv, 20);
    this.ui.keyValue('Port', summary.server.port, 20);
    this.ui.keyValue('CORS Origin', summary.server.corsOrigin, 20);
    this.ui.newLine();

    // Database section
    this.ui.subheader('Database');
    this.ui.keyValue('URI', summary.database.uri, 20);
    const dbState = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    this.ui.keyValue('Status', dbState, 20);
    this.ui.newLine();

    // Cache section
    this.ui.subheader('Cache');
    this.ui.keyValue('URL', summary.cache.url, 20);
    this.ui.newLine();

    // JWT section
    this.ui.subheader('JWT');
    this.ui.keyValue('Configured', summary.jwt.configured ? 'Yes' : 'No', 20);
    this.ui.keyValue('Expiration', summary.jwt.expiration, 20);
    this.ui.newLine();

    // Email section
    this.ui.subheader('Email');
    this.ui.keyValue('Configured', summary.email.configured ? 'Yes' : 'No', 20);
    this.ui.keyValue('Host', summary.email.host, 20);
    this.ui.newLine();

    // Frontend section
    this.ui.subheader('Frontend');
    this.ui.keyValue('URL', summary.frontend.url, 20);
  }

  /**
   * Set a configuration value
   */
  async setConfig(key, value) {
    if (!key) {
      this.ui.error('Please provide a configuration key');
      this.ui.info('Usage: config:set <key> <value>');
      return;
    }

    if (!value) {
      value = await this.ui.question(`Enter value for ${key}`);
    }

    // Sensitive keys that require special handling
    const sensitiveKeys = ['JWT_SECRET', 'JWT_REFRESH_SECRET', 'EMAIL_PASS', 'PAYSTACK_SECRET_KEY'];
    
    if (sensitiveKeys.includes(key)) {
      this.ui.warning('This is a sensitive configuration key.');
      const confirm = await this.ui.confirm('Are you sure you want to update it?', false);
      if (!confirm) {
        this.ui.info('Cancelled');
        return;
      }
    }

    const spinner = this.ui.spinner('Updating configuration...');

    try {
      await this.config.updateValue(key, value);
      spinner.stop();
      this.ui.success(`Configuration updated: ${key}`);
      
      if (!sensitiveKeys.includes(key)) {
        this.ui.keyValue('New Value', value);
      }

      this.ui.newLine();
      this.ui.warning('Some changes may require a server restart to take effect.');
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to update configuration: ${error.message}`);
    }
  }

  /**
   * Reload configuration from file
   */
  async reloadConfig() {
    const spinner = this.ui.spinner('Reloading configuration...');

    try {
      await this.config.load();
      spinner.stop();
      this.ui.success('Configuration reloaded from .env file');
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to reload configuration: ${error.message}`);
    }
  }

  /**
   * Clear cache
   */
  async clearCache() {
    const confirm = await this.ui.confirm('Clear all cache data?', false);
    if (!confirm) {
      this.ui.info('Cancelled');
      return;
    }

    const spinner = this.ui.spinner('Clearing cache...');

    try {
      // Try to connect to Redis and flush
      const redisUrl = this.config.get('REDIS_URL');
      
      if (redisUrl) {
        const Redis = (await import('ioredis')).default;
        const redis = new Redis(redisUrl);
        await redis.flushdb();
        redis.disconnect();
      }

      spinner.stop();
      this.ui.success('Cache cleared successfully');
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to clear cache: ${error.message}`);
      this.ui.info('Note: Redis may not be running or configured');
    }
  }

  /**
   * Show cache statistics
   */
  async cacheStats() {
    const spinner = this.ui.spinner('Fetching cache statistics...');

    try {
      const redisUrl = this.config.get('REDIS_URL');
      
      if (!redisUrl) {
        spinner.stop();
        this.ui.warning('Redis not configured');
        return;
      }

      const Redis = (await import('ioredis')).default;
      const redis = new Redis(redisUrl, { connectTimeout: 5000 });
      
      const info = await redis.info();
      const dbSize = await redis.dbsize();
      
      spinner.stop();

      this.ui.header('Cache Statistics', 'thunder');
      
      // Parse Redis INFO
      const lines = info.split('\r\n');
      const stats = {};
      
      for (const line of lines) {
        if (line.includes(':')) {
          const [key, value] = line.split(':');
          stats[key] = value;
        }
      }

      this.ui.keyValue('Status', 'Connected', 25);
      this.ui.keyValue('Keys', dbSize.toLocaleString(), 25);
      this.ui.keyValue('Used Memory', stats.used_memory_human || 'N/A', 25);
      this.ui.keyValue('Peak Memory', stats.used_memory_peak_human || 'N/A', 25);
      this.ui.keyValue('Uptime (days)', stats.uptime_in_days || 'N/A', 25);
      this.ui.keyValue('Connected Clients', stats.connected_clients || 'N/A', 25);
      this.ui.keyValue('Total Connections', stats.total_connections_received || 'N/A', 25);
      this.ui.keyValue('Total Commands', stats.total_commands_processed || 'N/A', 25);

      redis.disconnect();
    } catch (error) {
      spinner.stop();
      this.ui.error(`Failed to get cache stats: ${error.message}`);
    }
  }
}
