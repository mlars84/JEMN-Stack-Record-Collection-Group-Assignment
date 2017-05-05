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

//connect to mongo db
mongoose.connect ('mongodb://localhost:27017/fridayRecords');

// define record schema
var recordSchema = mongoose.Schema({
  artist: String,
  album: String,
  year: Number,
  imageUrl: String
});

var record = mongoose.model('records', recordSchema);

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); //end base get

app.get('/getRecords', function(req, res) {
  console.log('getRecords');
  record.find().then(function (data){
    res.send(data);
  });
}); // end getRecords GET

app.delete('/removeRecord', function(req, res) {
  console.log('removeRecord');
  record.remove({_id: req.body.id}, function(err) {
    if(err) {
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200);
    }
  });
}); // end removeRecord DELETE


app.post('/addRecord', function(req, res) {
  console.log('/addRecord POST', req.body);
  var newRecord = record(req.body);
  console.log('newRecord:', newRecord);
  newRecord.save();
  res.send(newRecord);
}); // end addRecord POST


app.put('/updateRecord', function(req, res) {
  console.log('updateRecord PUT');
  
}); // end updateRecord PUT




// spin up server
app.listen(port, function(){
  console.log('server up on:', port);
});// end listen
