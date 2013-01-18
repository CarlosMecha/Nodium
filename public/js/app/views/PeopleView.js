define(['jquery', 'backbone', 'models/Person', 'models/People', 'text!app/templates/people.html', 'text!app/templates/person.html'],
    function ($, Backbone, Person, People, peopleTemplate, personTemplate) {
        var PeopleView = Backbone.View.extend({
            el: '#content',
            initialize: function (people) {
                if (typeof people === "undefined") {
                    people = new People();
                    people.fetch();
                }
                this.people = people;
                this.render();  
            },
            events: {

            },
            render: function () {
                var templs = new String();
                this.people.forEach(function (person) { templs += _.template(personTemplate, person); });
                this.$el.html(_.template(peopleTemplate, {people: templs}));
                return this;
            }
        });  
        
        return PeopleView;  
        
    }
);

