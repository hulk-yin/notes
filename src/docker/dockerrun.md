# Docker RUN 参数使用笔记

```
	docker run [OPTIONS] IMAGE[:TAG] [COMMAND] [ARG...]

```
OPTIONS 参数在Docker 官网有专门的篇章记录，作为笔记，这里基本按照使用时遇到的场景进行记录。


启动一个docker 容器
```
 docker run docker-image-name

```

## OPTIONS 使用记录
### -d 

```
 docker run -d mysql 
```
如果在docker run 后面追加-d=true或者-d，则containter将会运行在后台模式(Detached mode)。此时所有I/O数据只能通过网络资源或者共享卷组来进行交互。因为container不再监听你执行docker run的这个终端命令行窗口。但你可以通过执行docker attach 来重新挂载这个container里面。需要注意的时，如果你选择执行-d使container进入后台模式，那么将无法配合"--rm"参数。


### -name 

```
 docker run -name my-db-server mysql 
```
运行一个 名称为 my-db-server 的 mysql 容器，


## 参考

[Docker学习总结之Run命令介绍](http://doc.okbase.net/vikings-blog/archive/124865.html)