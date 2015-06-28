var express = require('express'),
	member = require('../model/member')

var app = express();


app.get('/member', member.findAll);
app.get('/member/:id', member.findById);
app.post('/member', member.add);
app.put('/member/:id', member.update);
app.delete('/member/:id', member.delete);


app.listen(8080);
console.log('Express Listening on port 8080...');