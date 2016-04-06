function route(handle, pathname, response, request, postData){
  console.log("About to route a request for "+ pathname);

  // 检查给定的路径对应的请求处理程序是否存在
  if(typeof handle[pathname] ==='function'){
  	// 如果存在的话直接调用相应的函数
    handle[pathname](response, request, postData);
  }else{
    console.log("No request handler found for "+ pathname);
    // 如果没有对应的请求处理器处理，我们就直接返回“404”错误。
    response.writeHead(404,{"Content-Type":"text/plain"});
    response.write("404 Not found");
    response.end();
  }

}

exports.route = route;