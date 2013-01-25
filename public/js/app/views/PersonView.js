define(['jquery', 'backbone', 'models/Person', 'text!templ/person.html'],
    function ($, Backbone, Person, personTemplate) {
        var PersonView = Backbone.View.extend({
            el: '#content',
            containsErrors: false,
            $errorsCache: {},
            $inputsCache: {},
            rendered: false,
            initialize: function (person) {
                this.person = person;
                this.person.on('invalid', this.printErrors, this);
            },
            events: {
                'submit form': 'submit'
            },
            render: function () {
                var self = this;
                this.$el.html(_.template(personTemplate, this.person.toJSON()));
                this.$el.find('span[data-error-for]').each(function (i) {
                    self.$errorsCache[$(this).data('errorFor')] = $(this);
                });
                this.$el.find('input[data-input]').each(function (i) {
                    self.$inputsCache[$(this).data('input')] = $(this);
                });
                if (this.containsErrors) this.clearErrors();
                this.rendered = true;
                return this;
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
                if (_.isObject(errors)) { 
                    _.map(errors, function (error, field) {
                        if (self.$errorsCache[field]) {
                            self.$errorsCache[field].text(error);
                            if (self.$inputsCache[field]) {
                                self.$inputsCache[field].addClass('input-error');
                            }
                        }
                    });
                    this.containsErrors = true;
                }
            },
            clearErrors: function () {
                if (!this.containsErrors) return;
                for (var error in this.$errorsCache) {
                    this.$errorsCache[error].text('');
                }
                for (var input in this.$inputsCache) {
                    this.$inputsCache[input].removeClass('input-error');
                }
                this.containsErrors = false;
            }
        });  
        
        return PersonView;  
        
    }
);
