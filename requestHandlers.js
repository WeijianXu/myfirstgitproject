/**
 *
 * 尽可能的避免阻塞操作，取而代之，多使用非阻塞操作。
 * 要用非阻塞操作，我们需要使用回调，通过将函数作为参数传递给其他需要花时间做处理的函数
 * 如果包含了阻塞操作，它会阻塞了所有其他的处理工作。
 */

var querystring = require("querystring"),
  fs = require("fs"),
  formidable = require("formidable");

function start(response, request, postData){
  console.log("Request handler 'start' was called.");
  var body = [
  	'<html>',
    '<head>',
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
    '</head>',
    '<body>',
    '<ul><li name="homepage">首页</li><li name="control">控制台</li></ul>',
    '<form action="/upload" enctype="multipart/form-data" method="post">',
      '<input type="file" name="upload" multiple="multiple"><br>',
      '<input type="submit" value="Upload file" />',
    '</form>',
    '</body>',
    '</html>'
  ].join('');

  response.writeHead(200,{"Content-Type":"text/html"});
  response.write(body);
  response.end();
}

function upload(response, request, postData){
  console.log("Request handler 'upload' was called.");
  /*response.writeHead(200,{"Content-Type":"text/plain"});
  response.write("You've sent: "+ querystring.parse(postData).text);
  response.end();*/
  var form = new formidable.IncomingForm();
  // 写一个临时路径，解决Node.js调用fs.renameSync报错的问题（Error: EXDEV, cross-device link not permitted）
  form.uploadDir='tmp';
  console.log("about to parse");
  form.parse(request,function(error, fields, files){
    console.log("parsing done");
    fs.renameSync(files.upload.path, "./tmp/test.jpg");
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' style='width:100%;' />");
    response.end();
  });
}

function show(response, request, postData){
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.jpg","binary",function(error, file){
    if(error){
      response.writeHead(500,{"Content-Type":"text/plain"});
      response.write(error +"\n");
    }else{
      response.writeHead(200,{"Content-Type":"image/png"});
      response.write(file,"binary");
    }
    response.end();
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;