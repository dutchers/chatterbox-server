var app = app || {};

app.MessagesView = Backbone.View.extend({

  el: '.chats',

  initialize: function() {
    this.collection.on('sync add remove change', this.render, this);
  },

  render: function() {
    this.$el.children().detach();
    this.collection.each(function(message) {
      this.renderMessage(message);
    }, this);
  },

  renderMessage: function (message) {
    var newMessage = new app.MessageView({
      model: message
    });

    this.$el.append(newMessage.render().el);
  }


});
