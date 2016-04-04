/**
 * 主文件 index.js
 */

//  在其中启动我们的HTTP和路由模块
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// 将不同的URL映射到相同的请求处理程序上
var handle = {};
handle["/"]= requestHandlers.start;
handle["/start"]= requestHandlers.start;
handle["/upload"]= requestHandlers.upload;

// 将路由函数作为参数传递到服务器的start()函数
server.start(router.route, handle);