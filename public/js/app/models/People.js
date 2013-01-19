define(['backbone', 'models/Person'], function (Backbone, Person) {
    var People = Backbone.Collection.extend({
        model: Person,
        url: function () {
            return '/people';
        }
    });
    return People;
});
