define(['jquery', 'backbone', 'models/Person', 'models/People', 'views/PeopleView'], 
    function ($, Backbone, Person, People, PeopleView) {
        var Router = Backbone.Router.extend({
            currentView: null,
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
                var view = new PeopleView();
                view.people.fetch();
                view.people.on('reset', view.render, view);
            },
            person: function (name) {
                var person = new Person({name: name}),
                    view = new PeopleView(new People([person]));
                person.fetch();
                // Backbone triggers 'change' when a model has changed inside a collection.
                view.people.on('change', view.render, view);
                this.changeView(view);
            },
            changeView: function (newView) {
                if (this.currentView != null) {
                    this.currentView.undelegateEvents();
                }
                this.currentView = newView;
            }
        });    
        return Router;
    }
);
