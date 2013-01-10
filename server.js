var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodium');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(callback){
    console.log('Mola');
});
var schema = mongoose.Schema({
    name: String    
});
var Sc = mongoose.model('Sc', schema);
var ob1 = new Sc({name: 'Hola'}),
    ob2 = new Sc({name: 'Adios'}),
    errF = function (err, doc){
        if (err) {
            console.log('putamalder');   
        }
    };
ob1.save(errF);
ob2.save(errF);

var app = express();

app.get("/", function(request,response) {
    response.send("Hello World\n");
});
app.get("/json", function(request,response) {
    var ob = {name: "hola", title: "world"};
    response.send(ob);
});
app.get("/object/:name", function(request,response) {
    var ob = {name: request.params.name, title: "world"};
    response.send(ob);
});

app.listen(8800);

console.log("Server running.");

