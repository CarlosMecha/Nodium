define(['jquery', 'backbone', 'models/Person', 'models/People', 'views/PersonView', 'views/PeopleView'], 
    function ($, Backbone, Person, People, PersonView, PeopleView) {
        var Router = Backbone.Router.extend({
            currentView: null,
            initialize: function () {
                Backbone.history.start();
                this.people = new People();
            },
            routes: {
                '': 'index',
                'people': 'people',
                'people/:id' : 'person'
            },

            index: function () {
            },
            people: function () {
                var view = new PeopleView(this.people);
                this.people.fetch();
                this.people.on('reset', view.render, view);
            },
            person: function (id) {
                var person = new Person({_id: id}, {collection: this.people}),
                    view = new PersonView(person);
                person.fetch();
                // Backbone triggers 'change' when a model has changed inside a collection.
                view.person.on('change', view.render, view);
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
