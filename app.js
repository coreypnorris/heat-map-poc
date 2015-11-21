var express = require('express');
var app = express();
require('dotenv').load();
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render(__dirname + '/public/views/heat_map.jade',
    { apiKey: process.env.api_key}
  )
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});