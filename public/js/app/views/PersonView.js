define(['jquery', 'backbone', 'models/Person', 'text!templ/person.html'],
    function ($, Backbone, Person, personTemplate) {
        var PersonView = Backbone.View.extend({
            el: '#content',
            containsErrors: false,
            rendered: false,
            action: 'update',
            emptyPerson: {_id: "", nickName: "", firstName: "", lastName: ""},
            initialize: function (person, router, isNew) {
                this.person = person;
                this.router = router;
                if (isNew) this.action = 'create';
                this.person.on('invalid', this.printErrors, this);
                this.person.on('error', function () {
                    this.printErrors(this.person, {server: 'Error from server.'});
                }, this);
            },
            events: {
                'submit form': 'submit',
                'change #delete': 'deleteCheckbox',
            },
            render: function () {
                var model = (this.action === 'create') ? this.emptyPerson : this.person.toJSON();
                this.$el.html(_.template(personTemplate, model));
                this.rendered = true;
                this.fillCache();
                this.containsErrors && this.clearErrors();
                switch (this.action) {
                    case 'update': this.$cache.inputs.nickName.prop('disabled', true); break;
                    case 'create': this.$el.find('#delete').prop('disabled', true); break;
                    default: break;
                }
                return this;
            },
            deleteCheckbox: function () {
                switch (this.action) {
                    case 'update': this.action = 'delete'; break;
                    case 'delete': this.action = 'update'; break;
                    default: break;
                }
                (this.$cache.submit && this.action === 'delete') 
                    ? this.$cache.submit.val('Delete') 
                        : this.$cache.submit.val('Save');
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
                    // Hiding <li> element.
                    $(this).parent().hide();
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
                event.preventDefault();
                switch (this.action) {
                    case 'delete':
                        this.person.collection.once('remove', function () {
                            this.router.navigate('/people', {trigger: true});
                        }, this);
                        this.person.destroy();
                        break;
                    case 'update': 
                        $form.serializeArray().forEach(function (data) {
                            if (data.name !== 'delete') attrs[data.name] = data.value;
                        });
                        this.person.once('change', function () {
                            this.router.navigate('/people/' + this.person.id, {trigger: true});    
                        }, this);
                        this.person.save(attrs);
                        break;
                    case 'create':
                        $form.serializeArray().forEach(function (data) {
                            if (data.name !== 'delete' && data.name !== '_id') {
                                attrs[data.name] = data.value;
                            }
                        });
                        this.person.once('sync', function () {
                            this.person.collection.add(this.person);
                            this.router.navigate('/people/' + this.person.id, {trigger: true});    
                        }, this);
                        this.person.save(attrs);
                        break;
                    default:
                }
            },
            printErrors: function (model, errors) {
                var self = this;
                if (!this.rendered) return;
                this.$cache.error.container && this.$cache.error.container.show();
                if (_.isObject(errors)) { 
                    _.map(errors, function (error, field) {
                        if (self.$cache.error.fields[field]) {
                            self.$cache.error.fields[field].show().text(error);
                            self.$cache.error.fields[field].parent().show();

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
                    this.$cache.error.fields[error].parent().hide();
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
