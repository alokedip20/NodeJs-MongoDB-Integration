const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var db;
app.set('view engine','ejs');
MongoClient.connect('mongodb url',(err,database)=>{
	if(err){
		console.log(err);
	}
	else{
		db=database;
		app.listen(8080,(req,res)=>{
			console.log('listening to the port http://127.0.0.1:8080');
		});
	}
});
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
	db.collection('studentDatabase').find().toArray((err,result)=>{
			if(err){
				console.log(err);
			}
			else{
				console.log(result);
				res.render('index.ejs',{studentDatabase:result});
			}
	});

});
app.post('/studentDatabase',(req,res)=>{
	db.collection('studentDatabase').save(req.body,(err,result)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log('document has been saved');
			res.redirect('/');
		}
	});
});
