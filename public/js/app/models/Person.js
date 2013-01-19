define(['backbone'], function (Backbone) {
    var Person = Backbone.Model.extend({
        idAttribute: '_id',
        url: function () {
            return '/people/' + this.get('name');
        },
        initialize: function () {
                
        }
    });  
    return Person;  
});
