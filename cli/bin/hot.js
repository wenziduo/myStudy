#! /usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const shell = require("shelljs");

const fs = require("fs");
const path = require("path");

// 启动项目
program
  .command("run <serverType>")
  .description("启动项目")
  .action((serverType, otherDirs) => {
    // 获取当前路径
    const currentPath = shell.pwd().stdout;
    let currentData = {}
    try {
      currentData = require(`${currentPath}/wm-config.js`)
    } catch (error) {
      currentData = {}
    }
    const defaultConfig = require('../setting/wm-config')
    const endConfig = {
      ...defaultConfig,
      ...currentData,
      currentPath,
    }
    shell.cd(__dirname)
    shell.cd('..')
    // 写入默认文件
    fs.writeFile(`${shell.pwd().stdout}/setting/wm-config.js`, `module.exports = ${JSON.stringify(endConfig, null, 2)}`, function (err) {
      if (err) {
        return console.log(err);
      }
      // 判断当前环境
      if (serverType === 'dev') {
        shell.exec('npm run dev')
      }
      if (serverType === 'test') {
        shell.exec('npm run test')
      }
      if (serverType === 'local') {
        shell.exec('npm run local')
      }
    });
  })
program
  .parse();
