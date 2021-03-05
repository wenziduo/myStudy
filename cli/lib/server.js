const program = require("commander");
const inquirer = require("inquirer");
const shell = require("shelljs");
const childProcess = require("child_process");
console.log('server')
shell.exec("npm run test", function (error, stdout, stderr) {
    if (error) {
      console.log("************");
      console.log(error);
      return;
    }
    console.log("成功");
  });