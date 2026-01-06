import 'dotenv/config';
import mongoose from 'mongoose';
import Agenda from 'agenda';
import logger from './utils/logger.js';
import { connectDatabase } from './database/app.database.js';

/**
 * Background Worker Process
 * Handles scheduled jobs and background tasks using Agenda
 * Runs as a separate PM2 process for production environments
 */

const agendaService = new Agenda({
  db: {
    address: process.env.MONGODB_URI,
    collection: 'agendaJobs',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  processEvery: '30 seconds',
  maxConcurrency: 20,
  lockLimit: 0,
  defaultConcurrency: 5,
});

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = async (signal) => {
  logger.info(`Worker process received ${signal}, shutting down gracefully...`);
  
  try {
    await agendaService.stop();
    await mongoose.connection.close();
    logger.info('Worker process shut down successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

/**
 * Start the worker process
 */
const startWorker = async () => {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('Worker: Connected to database');

    // Start agenda
    await agendaService.start();
    logger.info('Worker: Agenda started and listening for jobs');

    // Define job handlers here
    // Example: agendaService.define('send-email', emailJobHandler);
    
    // Graceful shutdown handlers
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Signal PM2 that the process is ready
    if (process.send) {
      process.send('ready');
    }

    logger.info('Worker process is running and ready to process jobs');

  } catch (error) {
    logger.error('Failed to start worker process:', error);
    process.exit(1);
  }
};

// Start the worker
startWorker();
