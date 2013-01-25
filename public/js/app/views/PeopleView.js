define(['jquery', 'backbone', 'models/Person', 'models/People', 'text!templ/people.html', 'text!templ/person-row.html'],
    function ($, Backbone, Person, People, peopleTemplate, personRowTemplate) {
        var PeopleView = Backbone.View.extend({
            el: '#content',
            initialize: function (people) {
                // The router has to bind events and sets when this view has to render itself.
                if (typeof people === "undefined") {
                    people = new People();
                }
                this.people = people;
            },
            events: {

            },
            render: function () {
                var templs = new String();
                this.people.forEach(function (person) { templs += _.template(personRowTemplate, person.toJSON()); });
                this.$el.html(_.template(peopleTemplate, {people: templs}));
                return this;
            },
        });  
        
        return PeopleView;  
        
    }
);

