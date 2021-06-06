## node-project

---

New NodeJS Static Web Server

### 五部分

- 处理 HTTP 接口
- 连接数据库
- 实现登录
- 安全
- 日志

- http、nodejs 处理 http、处理路由，mysql
- cookie、session、redis、nginx 反向代理
- sql 注入、xss 攻击、加密
- 日志、stream、conrtab、readline

### server 和前端的区别

- 服务稳定性（最后性）
- 内存 CPU（优化扩展）
- 日志记录
- 安全（登录验证）
- 集群和服务拆分

### session

- 存储到服务端
- 在内存中，访问频繁，性能要求高
- 数据量不会很大

### Redis

- 启动命令：
  - cmd 模式先切换到 redis 放置目录，c 盘到 d 盘输入 d:
  - cmd 模式： redis-server.exe redis.windows.conf
  - powershell 模式： D:\tools\redis\redis-server redis.windows.conf

### Nginx

- 高性能 web 服务器，开源免费
- 用于静态服务、负载均衡
- 反向代理
- 命令
- cd 到 nginx 安装目录下，nginx 即可，访问 localhost:80，查看是否启动成功
- 重启 nginx：nginx -s reload
- 查看进程： netstat -ano | findstr 0.0.0.0:80
- 测试配置文件格式是否正确：nginx -t

### 日志

- morgan
- 自定义 console.log 和 console.error()

### 中间件

- path: example/express-demo/like-express(代码原理展示)
- app.use 注册在中间件
- 遇到 HTTP 请求，根据 path 和 method 判断触发哪些中间件
- 实现 next 机制

### PM2

- npm i pm2 -g
- 守护进程，系统崩溃自动重启
- 启动多进程，充分利用 CPU 和内存
- 自带日志记录功能

### Mongdb

- MongoDB 是一个文档数据库
- MySQL 是以表格形式存储数据
- Redis 是以 key-value 形式存储
- MongoDB 是以文档形式存储，格式像 json

- 操作
- 安装 MongoDB ---> 菜鸟教程
- 在 bin 目录下执行, cmd 命令，在开启 GUI Compass 之前需要开启 --->

```javascript
mongod.exe --dbpath C:\tools\MongoDB\data
```

- 再开一个 cmd 窗口，执行下面命令,安装 compass 之后就不需要了

```
mongo.exe --port 27017
```

- 结构
  - 数据库
  - 集合
  - 文档
