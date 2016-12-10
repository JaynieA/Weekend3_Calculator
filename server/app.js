var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );

var PORT = 3000;

//moderators??
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.listen(PORT, function() {
  console.log('server listening on port', PORT);
});
