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

var calcResult = function(route, req){
  var operation = req.body;
  var x = Number(operation.x);
  var y = Number(operation.y);
  var result;
  //do logic to complete the operation here
  switch (route) {
    case '/addition':
        result = x + y;
      break;
    case '/subtraction':
        result = x - y;
      break;
    case '/division':
        result = x / y;
      break;
    case '/multiplication':
        result = x * y;
      break;
    default:
      result = 'Error';
  }
  console.log(x, route, y,'= ', result);
  return result;
}; // end doOperation
//ROUTES
app.post('/addition', function(req, res) {
  res.send({result: calcResult('/addition', req)});
}); // end addition post response
app.post('/subtraction', function(req, res) {
  res.send({result: calcResult('/subtraction', req)});
}); // end subtraction post response
app.post('/division', function(req, res) {
  res.send({result: calcResult('/division', req)});
}); // end division post response
app.post('/multiplication', function(req, res) {
  res.send({result: calcResult('/multiplication', req)});
}); // end multiplication post response
