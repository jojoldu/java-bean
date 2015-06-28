var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect : true});
db = new Db('memberdb', server);

db.open(function(err, db){
	if(!err){
		console.log('Connected to "memberdb" database');
		
		db.collection('members', { strict : true }, function(err, collection){
			
			if(err){
				console.log('members collection not exist');
				populateDB();
			}

		});
	}
});

exports.findById = function(req, res){
	var id = req.params.id;
	console.log('get member : ' + id);

	db.collection('members', function(err, collection){
		collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item){
			res.send(item);
		});
	});
};

exports.findAll = function(req, res){
	console.log('find All Members');

	db.collection('members', function(err, collection){
		collection.find().toArray(function(err, items){
			res.send(items);
		});
	});
};

exports.add = function(req, res){
	var member = req.body;
	console.log('add : '+JSON.stringify(member));

	db.collection('members', function(err, collection){
		collection.insert(member, {safe : true}, function(err, result){
			if(err){
				res.send({'error' : 'add error'});
			}else{
				console.log('success : '+ JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}

exports.update = function(req, res){
	var id = req.params.id;
	var member = req.body;
	console.log('update member : '+ id);
	console.log(JSON.stringify(member));

	db.collection('members', function(err, collection){
		collection.update({'_id' : new BSON.ObjectID(id)}, member, {safe : true}, function(err, result){

			if(err){
				console.log('update error : '+err);
				res.send({'error' : 'update error'});
			}else{
				console.log('' + result + ' document(s) updated');
				res.send(member);
			}
		});
	});
};

exports.delete = function(req, res){
	var id = req.params.id;
	console.log('delete member : '+id);

	db.collection('members', function(err, collection){
		collection.remove({'_id' : new BSON.ObjectID(id)}, {safe:true}, function(err, result){
			if(err){
				res.send({'error' : 'delete error'});
			}else{
				console.log(''+result +' document(s) delete');
				res.send(req.body);
			}
		});
	});
};

var populateDB = function() {
 	console.log('populate DB');

    var members = [
    {
    	id: 'jojoldu',
        name: 'DongUk Lee',
        birtyDay: '870912',
        email : 'jojoldu@gmail.com',
        phone : '010-3583-1515'
    }];
 
    db.collection('members', function(err, collection) {
        collection.insert(members, {safe:true}, function(err, result) {
        	if(err){
        		console.log('insert error');
        	}else{
        		console.log('insert success');
        	}
        });
    });
};




