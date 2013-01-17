var mongoose = require('mongoose'),
    model = {};

mongoose.connect('mongodb://localhost/nodium');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(callback){
    console.log('The database is ready...');
});
var personSchema = mongoose.Schema({
    name: String,
    last: String    
});
model.Person = mongoose.model('person', personSchema);

module.exports = {
    conn: db,
    model: model,
    utils: {
        error: function (err, doc) {
            if (err) {
                console.error('Failed to treat this object: %j', doc);
            }
        }
    }
};


