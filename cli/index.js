#! /usr/bin/env node

const program = require("commander");
const shell = require("shelljs");
const pkg = require("./package.json");

const { exec, argv } = require("child_process");

program
  .version(pkg.version, "-v, --version")
  .option("-f, --foo", "enable some foo");

program.command("init <name>").action((name) => {
  shell.cd("C:/Users/wangyanan/AppData/Roaming/npm/node_modules/b2b-shop");
  // shell.cd("./bin");
  shell.echo(shell.pwd());
  shell.exec("yarn build", function (error, stdout, stderr) {
    if (error) {
      console.error(error);
    } else {
      console.log("success");
    }
  });
});

program.parse();
