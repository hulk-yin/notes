# docker 部署 nodejs + gitbook

## 容器配置
- Step1 创建gitbook 仓库
	
	- github 创建 仓库 leoyin/notes


- Step2 创建Dockerfile

```
# gitbook deploy —— github webhook
# v1.0.0

FROM node

MAINTAINER yinkehao@me.com


## 挂载应用目录
VOLUME ["/data/"]


# 安装cnpm
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装gitbook-cli
RUN cnpm install -g gitbook-cli
RUN gitbook update
# 安装 webhook
RUN cnpm install github-webhook-handler


## 切换工作目录
RUN mkdir /server
WORKDIR /server

RUN git clone https://github.com/leoyin/notes.git notes


## 添加 应用文件和部署文件
ADD ./app.js /server/
ADD ./deploy.sh /server/
# Deploy.sh 执行权限  
# RUN chmod +x /server/deploy.sh



# 启动 web server
# RUN node app.js

## 执行部署逻辑
#ENTRYPOINT node ./app.js


``` 

- Step2 创建部署脚本 deploy.sh

```
		#! /bin/bash

		cd ./notes;
		git pull;
		cd ../;
		gitbook build ./notes ;
		mv ./notes/_book /data;
   
```

- Step4 配置github webhook 进行自动化部署

- Step5 配置Nginx 转发