var assert = require('assert');
var fs = require('fs');
var mongodb = require('mongodb');

var uri = 'mongodb://127.0.0.1:27017/test';

mongodb.MongoClient.connect(uri, function(error, db){
  //assert.ifError(error);
  if(error){
  	console.log('can not connect');
  	return;
  }
  var bucket = new mongodb.GridFSBucket(db);
  fs.createReadStream('/home/shankha95/sillycon/index.jpg').
  pipe(bucket.openUploadStream('pengoo.jpg')).on('error', function(error) {
      //assert.ifError(error);
      console.log('error while uploading');
    }).
    on('finish', function() {
      console.log('done!');
      process.exit(0);
    });
    bucket = new mongodb.GridFSBucket(db);
	bucket.openDownloadStreamByName('pengoo.jpg').
  pipe(fs.createWriteStream('/home/shankha95/sillycon/download_pengoo.jpg')).
  on('error', function(error) {
    assert.ifError(error);
  }).
  on('finish', function() {
    console.log('download done!');
    process.exit(0);
  });

});