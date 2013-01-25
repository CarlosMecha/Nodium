define(['jquery', 'backbone', 'models/Person', 'text!templ/person.html'],
    function ($, Backbone, Person, personTemplate) {
        var PersonView = Backbone.View.extend({
            el: '#content',
            containsErrors: false,
            rendered: false,
            initialize: function (person) {
                this.person = person;
                this.person.on('invalid', this.printErrors, this);
            },
            events: {
                'submit form': 'submit'
            },
            render: function () {
                this.$el.html(_.template(personTemplate, this.person.toJSON()));
                this.rendered = true;
                this.fillCache();
                if (this.containsErrors) this.clearErrors();
                return this;
            },
            fillCache: function () {
                if (!this.rendered) return;
                this.$cache = {};
                this.$cache = {}
                this.$cache.error = {};
                this.$cache.error.fields = {};
                this.$cache.inputs = {};
                var self = this;
                this.$el.find('.errors').each(function (i) {
                    self.$cache.error.container = $(this).hide();    
                });
                this.$el.find('span[data-error-for]').each(function (i) {
                    self.$cache.error.fields[$(this).data('errorFor')] = $(this).hide();
                });
                this.$el.find('input[data-input]').each(function (i) {
                    self.$cache.inputs[$(this).data('input')] = $(this);
                });
                return $cache;
            },
            submit: function () {
                var $form = this.$el.find('form');
                var attrs = {};
                $form.serializeArray().forEach(function (data) {
                    attrs[data.name] = data.value;
                });
                this.person.save(attrs);
            },
            printErrors: function (model, errors, options) {
                var self = this;
                if (!this.rendered) return;
                if (this.$cache.error.container) this.$cache.error.container.show();
                if (_.isObject(errors)) { 
                    _.map(errors, function (error, field) {
                        if (self.$cache.error.fields[field]) {
                            self.$cache.error.fields[field].show().text(error);

                            if (self.$cache.inputs[field]) {
                                self.$cache.inputs[field].addClass('input-error');
                            }
                        }
                    });
                    this.containsErrors = true;
                }
            },
            clearErrors: function () {
                if (!this.rendered && !this.containsErrors) return;
                if (this.$cache.error.container) this.$cache.error.container.hide();
                for (var error in this.$errorsCache) {
                    this.$cache.error.fields[error].hide().text('');
                }
                for (var input in this.$inputsCache) {
                    this.$cache.inputs[input].removeClass('input-error');
                }
                this.containsErrors = false;
            }
        });  
        
        return PersonView;  
        
    }
);
