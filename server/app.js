var PORT = 3000;
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
//middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.listen(PORT, function() {
  console.log('server listening on port', PORT);
}); // end app listen

app.post('/', function(req, res) {
  console.log(req.body);
  //do logic to complete the operation here
  res.send(req.body);
}); // end app post

app.get('/get', function(req, res) {
  console.log('get landed on server');
  res.send('Hello');
}); // end app get
