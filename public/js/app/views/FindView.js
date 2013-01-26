define(['jquery', 'backbone', 'text!templ/find.html'],
    function ($, Backbone, findTemplate) {
        var FindView = Backbone.View.extend({
            el: '#content',
            initialize: function (router) {
                this.template = _.template(findTemplate, {});
                this.router = router;
                this.people = router.people;
            },
            events: {
                'submit form': 'prepareFind'
            },
            render: function () {
                this.$el.html(this.template);
                this.fillCache();
                this.rendered = true;
                return this;
            },
            prepareFind: function () {
                if (!this.rendered) return;
                if (this.$cache.refresh.is(':checked')) {
                    this.people.fetch();
                    this.people.on('reset', this.find, this);
                } else {
                    this.find();
                }
            },
            find: function () {
                this.router.startComputing();
                var nickName = this.$cache.input.val().trim().toLowerCase(),
                    person = this.people.find(function (model) {
                        if (model.get('nickName')) {
                            return (model.get('nickName').toLowerCase() === nickName);
                        }
                        return false;    
                    });
                this.router.stopComputing();
                if (person) {
                    this.router.navigate('/people/' + person.id, {trigger: true});
                } else {
                    this.$cache.error.text('Nobody is called ' + nickName);
                    this.$cache.input.val(nickName);
                }
            },
            fillCache: function () {
                this.$cache = {};
                var self = this;
                this.$el.find('#find').each(function () {
                    self.$cache.input = $(this);
                });
                this.$el.find('#refresh').each(function () {
                    self.$cache.refresh = $(this);
                });
                this.$el.find('.errors').each(function () {
                    self.$cache.error = $(this);
                });
                return this.$cache;
            }
        });  
        
        return FindView;
    }
);
