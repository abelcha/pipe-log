#!/usr/bin/env node
const vm = require('vm');
const _ = require('lodash');
const readline = require('readline');

const COMMAND_NAME = 'plog';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
})
.on('close', () => {
  let data = input.join('\n');
  try {
    data = JSON.parse(data);
  } catch (err) {
    // Fallback behavior: use input as string
  }
  const execStr = process.argv.slice(-1)[0];
  try {
    const commandResp = vm.runInNewContext(execStr, { _, data, e: data });
    if (typeof commandResp === 'function') {
      console.log(commandResp(data));
    } else {
      console.log(commandResp);
    }
  } catch (err) {
    const undefMatch = err.message.match(/^([\w$]+) is not defined$/);
    if (!undefMatch) {
      throw err;
    }
    const undefBaseVar = undefMatch && undefMatch[1];
    const execStrMatch = execStr.match(/^([\w$]+)/);
    const execStrBaseVar = execStrMatch && execStrMatch[1];
    if (undefBaseVar && execStrBaseVar === undefBaseVar) {
      console.log(vm.runInNewContext(execStr, { _, [undefBaseVar]: data }));
    }
  }
})
;
