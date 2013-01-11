var express = require('express'),
    conn = require('./lib/connection');
var ob1 = new conn.Person({name: 'Mariano', last: 'Rajoy'}),
    ob2 = new conn.Person({name: 'Cospedal', last: 'Bruja'}),
    errF = function (err, doc){
        if (err) {
            console.log('putamalder');   
        }
    };
ob1.save(conn.data.error);
ob2.save(conn.data.error);

var app = express();

app.get("/", function(request,response) {
    response.send("Hello World\n");
});
app.get("/json", function(request,response) {
    var ob = {name: "hola", last: "world"};
    response.send(ob);
});
app.get("/json/:name", function(request,response) {
    var ob = {name: request.params.name, last: "world"};
    response.send(ob);
});

app.listen(8800);

console.log("Server running.");

