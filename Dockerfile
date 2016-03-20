# gitbook deploy —— github webhook

# v1.0.0

FROM node

MAINTAINER yinkehao@me.com


## 挂载应用目录
VOLUME ["/data/"]
## 添加 应用文件和部署文件

ADD ./app.js /server/
ADD ./deploy.js /server/
## 切换工作目录
WORKDIR /server

# 安装cnpm
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装 webhook
RUN cnpm install github-webhook-handler

# 启动 web server
# RUN node app.js

## 执行部署逻辑
#ENTRYPOINT node ./app.js
