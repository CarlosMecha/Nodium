define(['jquery', 'backbone', 'text!templ/transition.html'],
    function ($, Backbone, transitionTemplate) {
        var TransitionView = Backbone.View.extend({
            el: '#content',
            initialize: function () {
                this.template = _.template(transitionTemplate, {});
            },
            render: function () {
                this.$el.html(this.template);
                return this;
            },
        });  
        
        return TransitionView;
    }
);
