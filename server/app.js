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
  var operation = req.body;
  console.log(operation);
  //do logic to complete the operation here
  var result;
  if (operation.type === '+') {
    console.log('addition');
    console.log('x: ',Number(operation.x), ' y:', Number(operation.y));
    result = Number(operation.x)+Number(operation.y);
    console.log('result:', result);
  } else if (operation.type === '-') {
    console.log('subtraction');
  } else if (operation.type === 'x') {
    console.log('multiplication');
  } else if (operation.type === '/') {
    console.log('division');
  }
  res.send({result: result});
}); // end app post
