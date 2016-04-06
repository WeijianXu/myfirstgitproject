// 请求（require）Node.js自带的 http 模块
var http = require("http");
// 找出浏览器请求的URL路径
var url = require("url");

function start(route, handle){
  function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    console.log("Request for "+ pathname +" received.");
    route(handle, pathname, response, request);
    /*var postData ="";
    request.setEncoding("utf8");

    //  将data和end事件的回调函数直接放在服务器中，在data事件回调中收集所有的POST数据；
    request.addListener("data",function(postDataChunk){
      postData += postDataChunk;
      // console.log("Received POST data chunk '"+ postDataChunk +"'.");
    });

    // 将请求路由的调用移到end事件处理程序中，以确保它只会当所有数据接收完毕后才触发，并且只触发一次
    request.addListener("end",function(){
      route(handle, pathname, response, request, postData);
    });*/

    //route(handle, pathname, response);

    // 下面关于response的函数调都注释掉，因为我们希望这部分工作让route()函数来完成。
    // response.writeHead(200,{"Content-Type":"text/plain"});
    // response.write("Hello World");
    // response.end();
  }

  // 调用http模块提供的函数： createServer。返回一个对象
	var service = http.createServer(onRequest);
	// service这个对象有一个叫做 listen 的方法，其数值参数指定这个HTTP服务器监听的端口号
	service.listen(8080);;
  console.log("Server has started.");
}

// 把某段代码变成模块意味着我们需要把我们希望提供其功能的部分 导出 到请求这个模块的脚本中
exports.start = start;