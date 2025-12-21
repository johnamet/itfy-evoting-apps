#!/usr/bin/env node
/**
 * ITFY E-Voting Admin Console
 * Interactive CLI for system administration, setup, and management
 */

import { ConsoleApp } from './app.js';

const console = new ConsoleApp();
console.start();
