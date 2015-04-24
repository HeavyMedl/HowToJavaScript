var express = require('express');
var app = express();
app.use("/css/", express.static(__dirname + '/css/',{maxAge:31536000000}));
app.use("/js/", express.static(__dirname + '/js/',{maxAge:31536000000}));
app.use("/imgs/", express.static(__dirname + '/imgs/',{maxAge:31536000000}));

app.get('/', function (req, res) {
  res.sendFile('views/index.html', {root: __dirname});
});

app.get('/intern', function (req, res) {
  res.sendFile('views/intern.html', {root: __dirname});
});

app.listen(3000, function () {
  console.log('Costco Internship server listening at http://127.0.0.1:3000');
});