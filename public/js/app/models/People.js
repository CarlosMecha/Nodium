define(['backbone', 'models/Person'], function (Backbone, Person) {
    var People = Backbone.Collection.extend({
        model: Person,
        url: '/people',
        findByNickName: function (nickName) {
            return this.find(function (person) {
                return (person.get('nickName') && person.get('nickName').toLowerCase() === nickName);
            });
        },
        findById: function (id) {
            return this.find(function (person) {
                return (person.id && person.id === id);
            });
        }
    });
    return People;
});
