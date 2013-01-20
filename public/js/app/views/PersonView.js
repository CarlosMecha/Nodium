define(['jquery', 'backbone', 'models/Person', 'text!app/templates/person.html'],
    function ($, Backbone, Person, personTemplate) {
        var PersonView = Backbone.View.extend({
            el: '#content',
            initialize: function (person) {
                this.person = person;
            },
            events: {

            },
            render: function () {
                this.$el.html(_.template(personTemplate, this.person.toJSON()));
                return this;
            },
        });  
        
        return PersonView;  
        
    }
);
