var express = require('express');
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

