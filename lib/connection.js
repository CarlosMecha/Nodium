var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodium');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(callback){
    console.log('The database is ready...');
});
var schema = mongoose.Schema({
    name: String,
    last: String    
});
var Person = mongoose.model('person', schema);

module.exports = {
    db: db,
    Person: Person,
    data: {
        error: function (err, doc) {
            if (err) {
                console.error('Failed to insert/update this object: %j', doc);
            }
        }
    }
};


