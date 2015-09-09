var app = app || {};


var collection = new app.Messages();
var formView = new app.FormView({collection: collection});
var messagesView = new app.MessagesView({collection: collection});

