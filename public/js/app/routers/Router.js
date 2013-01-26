define(['jquery', 'backbone', 'models/Person', 'models/People', 'views/PersonView', 'views/PeopleView', 'views/TransitionView', 'views/FindView'], 
    function ($, Backbone, Person, People, PersonView, PeopleView, TransitionView, FindView) {
        var Router = Backbone.Router.extend({
            currentView: null,
            initialize: function () {
                this.people = new People();
                this.transitionView = new TransitionView();
                this.$sections = {};
                var self = this;
                $('#menu li[data-section]').each(function () {
                    self.$sections[$(this).data('section')] = $(this);
                });
                // Fetch people from server.
                this.startComputing();
                this.people.fetch();
                this.people.on('reset', function () {
                    this.stopComputing();
                    Backbone.history.start();    
                    this.navigate('', {trigger: true});
                }, this);
            },
            routes: {
                '': 'find',
                'people': 'people',
                'people/:id' : 'person'
            },
            startComputing: function () {
                if (this.computing) return;
                if (this.currentView) {
                    this.currentView.undelegateEvents();
                    this.computingView = this.currentView;
                }
                this.transitionView.render();
                this.computing = true;
            },
            stopComputing: function () {
                if (!this.computing) return;
                if (this.computingView) {
                    this.computingView.delegateEvents();
                    this.currentView = this.computingView;
                    this.currentView.render();
                }
                this.computing = false;
            },
            find: function () {
                var view = new FindView(this);
                this.selectSection('find');
                this.changeView(view);
                this.transition();
            },
            people: function () {
                var view = new PeopleView(this.people);
                this.selectSection('people');
                this.changeView(view);
                this.transition();
            },
            person: function (id) {
                var person = new Person({_id: id}, {collection: this.people}),
                    view = new PersonView(person);
                this.selectSection('people');
                person.fetch();
                // Backbone triggers 'change' when a model has changed inside a collection.
                view.person.on('change', this.transition, this);
                this.changeView(view);
            },
            changeView: function (newView) {
                if (this.currentView) {
                    this.currentView.undelegateEvents();
                }
                this.currentView = newView;
                this.transitionView.render();
                this.transitionView.delegateEvents();
                this.waiting = true;
            },
            transition: function () {
                if (!this.currentView) return;
                if (this.waiting) {
                    this.transitionView.undelegateEvents();
                    this.waiting = false;
                }
                this.currentView.render();
            },
            selectSection: function (section) {
                _.map(this.$sections, function (el, s) {
                    if (s === section) {
                        el.addClass('selected');
                    } else {
                        el.removeClass('selected');
                    }
                });
            }
        });    
        return Router;
    }
);
