#Docker 部署ghost

## sqlite 版

- step 1
```
docker pull ghost
```

- step 2 准备ghost content目录

```
mkdir /www/ghost
copy -r ghostsrc/content /www/ghost/
copy ghostsrc/config.eaxample.js /www/ghost/config.js

```

- step 3 修改 config.js

修改 config.js production 项配置
`url:http//yourdomain`
`server:{host:0.0.0.0}`

- url 必须配置，ghost 初始化需访问域名需要与此域名保持一致

- step4 运行容器
```
docker run --name containername -p 80:2368 -e NODE_ENV=production -v /www/ghost:/var/lib/ghost -d ghost  

```

- step5 初始化ghost
浏览器访问 http:yourdomain/ghost 进入配置界面按照步骤进行配置即可
