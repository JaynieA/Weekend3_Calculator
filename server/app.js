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
  var x = Number(operation.x);
  var y = Number(operation.y);
  if (operation.type === '+') {
    result = x + y;
    console.log('addition:', x , '+', y,'= ', result);
  } else if (operation.type === '-') {
    result = x - y;
    console.log('subtraction:', x , '-', y,'= ', result);
  } else if (operation.type === 'x') {
    result = x * y;
    console.log('multiplication:', x , 'x', y,'= ', result);
  } else if (operation.type === '/') {
    result = x / y;
    console.log('division:', x , '/', y,'= ', result);
  }
  res.send({result: result});
}); // end app post
