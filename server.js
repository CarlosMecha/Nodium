var _ = require('underscore'),
    express = require('express'),
    consolidate = require('consolidate'),
    moment = require('moment'),
    app = express(),
    per = require('./persistence/mongo')(),
    port = 8800;

app.configure(function () {
    app.engine('html', consolidate.underscore);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use('/static', express.static(__dirname + '/public'));
});

app.get("/", function(request,response) {
    var time = moment().format('MMMM Do YYYY, HH:mm:ss');
    response.render('index', { time: time });
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

