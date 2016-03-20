# docker 部署 nodejs + gitbook

## 容器配置
- Step1 创建gitbook 仓库
	
	1. 创建仓库
		Dockerfile、webhook部署脚本一起放入文档仓库

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

- Step3 创建部署脚本 deploy.sh

```
		#! /bin/bash

		cd ./notes;
		git pull;
		cd ../;
		gitbook build ./notes ;
		rm -rf /data/_book; 
		mv ./notes/_book /data;
   
```

- Step4 阿里云docker hub dockerfie 构建

- Step5 运行容器

```
	docker run -v /home/html/notes:/data --name gitbookdeploy -p 7777:7777 -d registry.aliyuncs.com/ykh/notes node app.js
```


- Step5 配置Nginx 转发

```
pstream ykh.notes.http{
     server 127.0.0.1:7777;
}

server {
        listen  80;
        server_name notes.yinkehao.com;
        #access_log logs/notes.yinkehao.com.access.log main;

        location / {
                root /home/html/notes/_book;
        }
        location /webhook {
                proxy_pass http://ykh.notes.http;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $host;
        }
}

```


