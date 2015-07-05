var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db;

var server = new Server('127.0.0.1', 27017, {auto_reconnect : true});
db = new Db('local', server);

db.open(function(err, db){
	if(!err){
		console.log('Connected to "local" database');
		
		db.collection('member', { strict : true }, function(err, collection){
			
			if(err){
				console.log('member collection not exist');
				populateDB();
			}

		});
	}
});

exports.findById = function(req, res){
	var id = req.params.id;
	console.log('get member : ' + id);

	db.collection('member').findOne({'id': id}, function(err, item){
		res.send(item);
	});
};

exports.findAll = function(req, res){
	console.log('find All member');

	db.collection('member').find().toArray(function(err, items){
		res.send(items);
	});
};

exports.add = function(req, res){
	var member = req.body;
	console.log('add : '+ member);

	db.collection('member').insert(member, {safe : true}, function(err, result){
			
		if(err){
			res.send({'error' : 'add error'});
		}else{
			console.log('success : '+ JSON.stringify(result[0]));
			res.send(result[0]);
		}

	});
}

exports.update = function(req, res){
	var id = req.params.id;
	var member = req.body;
	console.log('update member : '+ id);
	console.log(JSON.stringify(member));

	db.collection('member').update({'id' : id}, {$set : {name : '222'}}, {safe : true}, function(err, result){

		if(err){
			console.log('update error : '+err);
			res.send({'error' : 'update error'});
		}else{
			console.log(result + ' document(s) update');
			res.send(member);
		}

	});
};

exports.delete = function(req, res){
	var id = req.params.id;
	console.log('delete member : '+id);

	db.collection('member').remove({'id' : id}, {safe:true}, function(err, result){
		
		if(err){
			res.send({'error' : 'delete error'});
		}else{
			console.log(result + ' document(s) delete');
			res.send(req.body);
		}

	});
};

var populateDB = function() {
 	console.log('populate DB');

    var member = [
    {
    	id: 'jojoldu',
        name: 'DongUk Lee',
        birthDay: '870912',
        email : 'jojoldu@gmail.com',
        phone : '010-3583-1515'
    }];
 
    db.collection('member').insert(member, {safe:true}, function(err, result) {
        if(err){
        	console.log('insert error');
        }else{
        	console.log('insert success');
        }
    });
};




