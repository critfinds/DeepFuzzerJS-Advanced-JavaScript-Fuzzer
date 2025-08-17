#!/usr/bin/env node
// HTTP Fuzzing
import fs from 'fs';
import WebSocket from 'ws';
import chalk from 'chalk';
import ora from 'ora';
import Table from 'cli-table3';
import { program } from 'commander';
import fetch from 'node-fetch'; 

// CLI Options
program
  .requiredOption('-u, --url <url>', 'WebSocket or HTTP URL to fuzz')
  .option('-o, --output <file>', 'Output file to save results')
  .option('-w, --wordlist <file>', 'Wordlist file for payloads')
  .option('-s, --seed <number>', 'Seed for fuzzing', Math.floor(Math.random() * 1e6))
  .parse(process.argv);

const options = program.opts();

// Spinner For Live CLI Feedback
const spinner = ora(`Starting fuzzing on ${options.url} with seed ${options.seed}...`).start();

// Table For Cool Terminal UI
const resultsTable = new Table({
  head: [chalk.blue('Payload'), chalk.green('Status'), chalk.yellow('Response')],
  colWidths: [30, 10, 50],
});

// Load Payloads
let payloads = [];
if (options.wordlist) {
  if (!fs.existsSync(options.wordlist)) {
    spinner.fail(`Wordlist file ${options.wordlist} not found`);
    process.exit(1);
  }
  payloads = fs.readFileSync(options.wordlist, 'utf-8').split(/\r?\n/).filter(Boolean);
} else {
  payloads = [
    'test1',
    'test2',
    '<script>alert(1)</script>',
    '/etc/passwd',
    'http://169.254.169.254/latest/meta-data/',
    '?id=1 OR 1=1',
  ];
}

// Array To Store Results
const results = [];

// Fuzzing function
async function fuzz() {
  for (const payload of payloads) {
    try {
      let status = 'N/A';
      let response = '';

      if (options.url.startsWith('ws')) {
        // WebSocket fuzzing
        await new Promise((resolve) => {
          const ws = new WebSocket(options.url);

          ws.on('open', () => {
            ws.send(payload);
          });

          ws.on('message', (msg) => {
            status = '200';
            response = msg.toString().slice(0, 50);
            ws.close();
          });

          ws.on('close', resolve);
          ws.on('error', (err) => {
            status = 'ERR';
            response = err.message.slice(0, 50);
            resolve();
          });
        });
      } else {
        // HTTP Fuzzing 
        const res = await fetch(`${options.url}?payload=${encodeURIComponent(payload)}`);
        status = res.status;
        response = (await res.text()).slice(0, 50);
      }

      results.push({ payload, status, response });
      resultsTable.push([payload, status, response]);
      spinner.text = `Fuzzing ${payload} ...`;
    } catch (err) {
      results.push({ payload, status: 'ERR', response: err.message });
    }
  }

  spinner.succeed(`Fuzzing completed for ${options.url}`);
  console.log(resultsTable.toString());

  if (options.output) {
    fs.writeFileSync(options.output, JSON.stringify(results, null, 2));
    console.log(chalk.green(`Results saved to ${options.output}`));
  }
}

// Run
fuzz();
