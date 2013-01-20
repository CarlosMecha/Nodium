module.exports = function () {
    var mongoose = require('mongoose').connect('mongodb://localhost/nodium'),
        db = mongoose.connection,
        models = {},
        schemas = {};

    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function (data) { console.log('The database is ready...'); });

    schemas.person = mongoose.Schema({
        nickName: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    });
    models.Person = mongoose.model('person', schemas.person);

    return {
        conn: db,
        models: models,
        schemas : schemas,
        ObjectId : mongoose.Types.ObjectId,
        utils: {
            error: function (err, doc) {
                err && console.error('Failed to treat this object: %j', doc);
            }
        }
    }
};


