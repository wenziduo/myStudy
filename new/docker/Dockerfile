## 指定这个镜像的基础是什么，我们选择了node: 8.9.3这个版本作为基础镜像
FROM node:8.9.3

MAINTAINER stoneship stoneship <258137678@qq.com>

##安装node相关依赖
RUN \
yarn && \
yarn build

## 安装nginx

## 安装数据库...

## 创建一个目录
RUN mkdir /test-data
## 指定命令运行的目录
WORKDIR /test-data
COPY ../dist/ /usr/share/nginx/html/