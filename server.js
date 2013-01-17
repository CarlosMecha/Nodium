var app = require('express')(),
    per = require('./persistence/mongo')(),
    port = 8800;

app.get("/", function(request,response) {
    response.send("Hello World\n");
});
app.get("/people", function(request,response) {
    per.models.Person.find(function (err, people) {
        (err) ? response.send(500) : response.send(200, people);
    });
});
app.get("/people/:name", function(request,response) {
    per.models.Person.findOne({name: request.params.name}, function (err, person) {
        (err) ? response.send(500) : (person) ? response.send(200, person) : response.send(404);
    });
});

app.listen(port);
console.log("Server running in %d.", port);

