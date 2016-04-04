/**
 *
 * 尽可能的避免阻塞操作，取而代之，多使用非阻塞操作。
 * 要用非阻塞操作，我们需要使用回调，通过将函数作为参数传递给其他需要花时间做处理的函数
 * 如果包含了阻塞操作，它会阻塞了所有其他的处理工作。
 */

var querystring = require("querystring");

function start(response, postData){
  console.log("Request handler 'start' was called.");
  var body = [
  	'<html>',
    '<head>',
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
    '</head>',
    '<body>',
    '<form action="/upload" method="post">',
      '<input type="submit" value="Submit text" /><br>',
      '<textarea name="text" rows="10" cols="120"></textarea>',
    '</form>',
    '</body>',
    '</html>'
  ].join('');

  response.writeHead(200,{"Content-Type":"text/html"});
  response.write(body);
  response.end();
}

function upload(response, postData){
  console.log("Request handler 'upload' was called.");
  response.writeHead(200,{"Content-Type":"text/plain"});
  response.write("You've sent: "+ querystring.parse(postData).text);
  response.end();
}

exports.start = start;
exports.upload = upload;