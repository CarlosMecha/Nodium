module.exports = function () {
    var mongoose = require('mongoose').connect('mongodb://localhost/nodium'),
        db = mongoose.connection,
        models = {},
        schemas = {};

    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function (data) { console.log('The database is ready...'); });

    schemas.person = mongoose.Schema({name: String, last: String});
    models.Person = mongoose.model('person', schemas.person);

    return {
        conn: db,
        models: models,
        schemas : schemas,
        utils: {
            error: function (err, doc) {
                err && console.error('Failed to treat this object: %j', doc);
            }
        }
    }
};


