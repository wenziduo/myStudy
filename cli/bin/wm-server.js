#! /usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const shell = require("shelljs");
const spawn = require("cross-spawn");
const colors = require("colors");

const fs = require("fs");
const path = require("path");

// 启动项目
program
  .command("run <serverType>")
  .description("启动项目")
  .action((serverType, otherDirs) => {
    // 获取当前路径
    const currentPath = shell.pwd().stdout;
    let currentData = {};
    try {
      currentData = require(`${currentPath}/wm-config.js`);
    } catch (error) {
      currentData = {};
    }
    const defaultConfig = require("../setting/wm-config");
    const endConfig = {
      ...defaultConfig,
      ...currentData,
      currentPath,
    };
    shell.cd(__dirname);
    shell.cd("..");
    // 写入默认文件
    fs.writeFile(
      `${shell.pwd().stdout}/setting/wm-config.js`,
      `module.exports = ${JSON.stringify(endConfig, null, 2)}`,
      function (err) {
        if (err) {
          return console.log(err);
        }
        let result;
        // 判断当前环境
        if (serverType === "dev") {
          shell.echo(colors.blue("dev环境开始启动..."));
          result = spawn.sync("npm", ["run", "dev"], {
            stdio: "inherit",
          });
          process.exit(result.status);
        }
        if (serverType === "test") {
          shell.echo(colors.blue("test环境开始启动..."));
          result = spawn.sync("npm", ["run", "test"], {
            stdio: "inherit",
          });
          process.exit(result.status);
        }
        if (serverType === "local") {
          shell.echo(colors.blue("local环境开始启动..."));
          result = spawn.sync("npm", ["run", "local"], {
            stdio: "inherit",
          });
          process.exit(result.status);
        }
        if (serverType === "build") {
          shell.echo(colors.blue("开始打包..."));
          result = spawn.sync("npm", ["run", "build"], {
            stdio: "inherit",
          });
        }
        process.exit(result.status);
      }
    );
  });
program.parse();
