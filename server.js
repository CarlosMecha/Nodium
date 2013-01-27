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

app.get("/", function(req,res) {
    var time = moment().format('MMMM Do YYYY, HH:mm:ss');
    res.render('index', { time: time });
});

app.get("/people", function(req,res) {
    per.models.Person.find(function (err, people) {
        (err) ? res.send(500) : res.send(200, people);
    });
});

app.get("/people/:id", function(req,res) {
    per.models.Person.findOne({ _id: req.params.id }, function (err, person) {
        (err) ? res.send(500) : (person) ? res.send(200, person) : res.send(404);
    });
});

app.put("/people/:id", function(req,res) {
    var update = { firstName: req.body.firstName, lastName: req.body.lastName };
    per.models.Person.update({ _id: req.params.id }, { $set: update }, 
        {multi: false},
        function (err, count) {
            (err) ? res.send(500) : (count > 0) ? res.send(200) : res.send(404);   
        }
    );
});

app.delete("/people/:id", function(req,res) {
    per.models.Person.findByIdAndRemove(req.params.id, null,
        function (err, doc) {
            (err) ? res.send(500) : (doc) ? res.send(200) : res.send(404);   
        }
    );
});

app.get("/people/find", function(req,res) {
    var nick = req.query.nick;
    if (typeof nick === "string" && null != nick && nick.length > 0) {
        per.models.Person.findOne({ nickName: nick.toLowerCase() }, function (err, person) {
            (err) ? res.send(500) : (person) ? res.send(200, person) : res.send(404);
        });
    } else {
        res.send(400);
    }
});

app.listen(port);
console.log("Server running in %d.", port);

