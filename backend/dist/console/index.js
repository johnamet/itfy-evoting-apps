#!/usr/bin/env node
/**
 * ITFY E-Voting Admin Console
 * Interactive CLI for system administration, setup, and management
 */
"use strict";

var _app = require("./app.js");
var console = new _app.ConsoleApp();
console.start();