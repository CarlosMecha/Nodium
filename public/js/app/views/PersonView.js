define(['jquery', 'backbone', 'models/Person', 'text!templ/person.html'],
    function ($, Backbone, Person, personTemplate) {
        var PersonView = Backbone.View.extend({
            el: '#content',
            containsErrors: false,
            rendered: false,
            toDelete: false,
            initialize: function (person, router) {
                this.person = person;
                this.router = router;
                this.person.on('invalid', this.printErrors, this);
            },
            events: {
                'submit form': 'submit',
                'change #delete': 'deleteCheckbox',
            },
            render: function () {
                this.$el.html(_.template(personTemplate, this.person.toJSON()));
                this.rendered = true;
                this.fillCache();
                if (this.person.id) {
                    this.$cache.inputs.nickName.prop('disabled', true);
                }
                if (this.containsErrors) this.clearErrors();
                return this;
            },
            deleteCheckbox: function () {
                this.toDelete = !this.toDelete;
                if (this.$cache.submit) {
                    (this.toDelete) ? this.$cache.submit.val('Delete') 
                        : this.$cache.submit.val('Save');
                }
            },
            fillCache: function () {
                if (!this.rendered) return;
                this.$cache = {};
                this.$cache = {}
                this.$cache.error = {};
                this.$cache.error.fields = {};
                this.$cache.inputs = {};
                var self = this;
                this.$el.find('.errors').each(function () {
                    self.$cache.error.container = $(this).hide();    
                });
                this.$el.find('span[data-error-for]').each(function () {
                    self.$cache.error.fields[$(this).data('errorFor')] = $(this).hide();
                });
                this.$el.find('input[data-input]').each(function () {
                    self.$cache.inputs[$(this).data('input')] = $(this);
                });
                this.$el.find(':submit').each(function () {
                    self.$cache.submit = $(this); 
                });
                return this.$cache;
            },
            submit: function (event) {
                var $form = this.$el.find('form'),
                    attrs = {};
                if (this.toDelete) {
                    this.person.collection.once('remove', function () {
                        this.router.navigate('/people', {trigger: true});
                    }, this);
                    this.person.destroy();
                } else {
                    $form.serializeArray().forEach(function (data) {
                        if (data.name !== 'delete') attrs[data.name] = data.value;
                    });
                    this.person.once('change', function () {
                        this.router.navigate('/people/' + this.person.id, {trigger: true});    
                    }, this);
                    this.person.save(attrs);
                }
                event.preventDefault();
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
