define(['jquery', 'backbone', 'app/models/Model', 'text!app/templates/test.html'],
    function ($, Backbone, Model, testTemplate) {
        var View = Backbone.View.extend({
            el: '#content',
            initialize: function () {
                this.render();  
            },
            events: {

            },
            render: function () {
                var m = new Model();
                this.template = _.template(testTemplate, {name: m.get('name'), last: m.get('last')});
                this.$el.html(this.template);
                return this;
            }
        });  
        
        return View;  
        
    }
);
