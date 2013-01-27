define(['backbone'], function (Backbone) {
    var fieldValidator = /^[\w][\w\s\-.]*$/,
        nickNameValidator = /^[A-Za-z]\w*$/,
        Person = Backbone.Model.extend({
        idAttribute: '_id',
        initialize: function () {
                
        },
        validate: function (attrs, options) {
            var errors = {};

            // Harcoded validator:
            if (attrs.nickName) {
                if (attrs.nickName.length == 0) {
                    errors.nickName = "Nickname couldn't be empty.";
                } else if (!nickNameValidator.test(attrs.nickName)) {
                    errors.nickName = "Nickname doesn't have a valid format.";
                } else if (this.collection.findByNickName(attrs.nickName.toLowerCase())) { 
                    errors.nickName = "Other person has the same nickname.";
                }
            }

            if (attrs.firstName) {
                if (attrs.firstName.length == 0) {
                    errors.firstName = "Firstname couldn't be empty.";
                } else if (!fieldValidator.test(attrs.firstName)) {
                    errors.firstName = "Firstname doesn't have a valid format.";   
                }
            }

            if (attrs.lastName) {
                if (attrs.lastName.length == 0) {
                    errors.lastName = "Lastname couldn't be empty.";
                } else if (!fieldValidator.test(attrs.lastName)) {
                    errors.lastName = "Lastname doesn't have a valid format.";   
                }
            }

            if (_.size(errors) > 0) { 
                return errors;
            }
        }
    });  
    return Person;  
});
