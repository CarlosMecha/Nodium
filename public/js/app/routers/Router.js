define(['jquery', 'backbone', 'models/Person', 'models/People', 'views/PeopleView'], 
    function ($, Backbone, Person, People, PeopleView) {
        var Router = Backbone.Router.extend({
            initialize: function () {
                Backbone.history.start();  
            },

            routes: {
                '': 'index',
                'people': 'people',
                'people/:name' : 'person'
            },

            index: function () {
            },
            people: function () {
                new PeopleView();
            },
            person: function (name) {
                var person = new People({name: name});
                person.fetch();
                new PeopleView(new People([person]));
            }
        });    
        return Router;
    }
);
