#! /usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const shell = require("shelljs");
const pkg = require("./package.json");

const fs = require("fs");
const path = require("path");

const projectSetting = require("./project-setting");

const { exec, argv } = require("child_process");
// 交互列表
const promptList = [
  {
    type: "input",
    message: "设置一个项目名称:",
    name: "name",
    validate: function (val) {
      if (!val.match(/^.[a-z0-9]+$/)) {
        return "只支持纯小写字母";
      }
      // 校验是否名称重复
      const isHasSameName = projectSetting.projects.some(
        (ele) => ele.name === val
      );
      if (isHasSameName) {
        return "存在相同名字的项目";
      }
      return true;
    },
  },
  {
    type: "input",
    message: "请输入端口号:",
    name: "port",
    validate: function (val) {
      if (
        !val.match(
          /^[1-9]$|(^[1-9][0-9]$)|(^[1-9][0-9][0-9]$)|(^[1-9][0-9][0-9][0-9]$)|(^[1-6][0-5][0-5][0-3][0-5]$)/
        )
      ) {
        return "请输入正确的端口号";
      }
      return true;
    },
  },
];

program
  .version(pkg.version, "-v, --version")
  .option("-p, --peppers", "Add peppers")
  .option("-P, --pineapple", "Add pineapple")
  .option("-b, --bbq-sauce", "Add bbq sauce")
  .option("-f, --foo", "enable some foo");

/* 启动项目 */
program
  .command("run <name> <server>")
  .description("启动项目")
  .action((name, server) => {
    inquirer.prompt(promptList).then((answers) => {
      console.log("answers", answers); // 返回的结果
    });
    // const projectSetting = require("./project-setting");
    // // 判断是否存在该项目
    // const isHasProject = projectSetting.projects.some(
    //   (ele) => ele.name === name
    // );
    // if (!isHasProject) {
    //   shell.echo("不存在该项目，请先添加项目后再启动");
    //   return;
    // }
    // const currentPath = projectSetting.projects.find((ele) => ele.name === name)
    //   .path;
    // shell.cd(currentPath);
    // shell.exec("yarn" + server, function (error, stdout, stderr) {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log("success");
    //   }
    // });
  });

/* 添加项目 */
program.command("add <name>").action((name) => {
  // 获取当前路径
  const currentPath = shell.pwd().stdout;
  // 查找是否有同名的
  const isSameName = projectSetting.projects.some((ele) => ele.name === name);
  if (isSameName) {
    shell.echo("该项目名称已经存在");
    return;
  }
  const newProjects = [...projectSetting.projects, { path: currentPath, name }];
  projectSetting.projects = newProjects;
  const newData = `module.exports = ${JSON.stringify(projectSetting, null, 2)}`;
  fs.writeFile(
    path.join(__dirname, "./project-setting.js"),
    newData,
    "utf8",
    (err) => {
      if (err) throw err;
      console.log("项目添加成功");
    }
  );
});

program.parse();
