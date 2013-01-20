define(['backbone', 'models/Person'], function (Backbone, Person) {
    var People = Backbone.Collection.extend({
        model: Person,
        url: '/people',
        initialize: function () {
        }
    });
    return People;
});
