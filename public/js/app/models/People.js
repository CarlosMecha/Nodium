define(['Backbone', 'models/Person'], function (Backbone, Person) {
    var People = Backbone.Collection.extend({model: Person});
    return People;
});
