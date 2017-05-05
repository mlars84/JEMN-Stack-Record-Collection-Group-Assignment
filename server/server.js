// requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// globals
var port = 3978;

//uses
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// spin up server
app.listen(port, function(){
  console.log('server up on:', port);
});// end listen

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); //end base get
