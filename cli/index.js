#!/usr/bin/env node

'use strict';

const commander = require('commander');
const changelog = require('./changelog');

commander
  .command('changelog')
  .action(changelog);

commander.parse(process.argv);
