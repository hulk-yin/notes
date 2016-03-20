var http = require('http')
var createHandler = require('github-webhook-handler')
// var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })
var handler = createHandler({ path: '/webhook', secret: 'kehaonotes' })

var exec = require("child_process").exec;
var path = require("path");
var deployfile = path.join(process.cwd(),"./deploy.sh");

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  	exec(deployfile, function callback(error, stdout, stderr) {
		console.log(stdout);
	});

})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})