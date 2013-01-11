define(['jquery', 'backbone'], function ($, Backbone) {
    var Model = Backbone.Model.extend({
        initialize: function () {
                
        },
        defaults: {
            name: "Agapito",
            last: "Morales"
        },
        validate: function (attrs) {
        }
    });  
    return Model;  
});
