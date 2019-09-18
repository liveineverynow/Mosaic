var express = require('express')
var path = require('path')

var app = express()

app.use(express.static('public'))

app.get('/download/:file', function(req, res) {
  res.send("hello world")
  //let samplePath = path.join(__dirname, "downloads", req.params.file)
  //res.download(samplePath)
})

app.listen(3000)
