var express = require( 'express' );
var app = express();
var path = require( 'path' );

var PORT = 3000;

//moderators??
app.use(express.static('public'));

app.listen(PORT, function() {
  console.log('server listening on port', PORT);
});
