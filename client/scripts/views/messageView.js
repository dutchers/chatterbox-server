var app = app || {};

app.MessageView = Backbone.View.extend({

  className: 'chat',

  initialize: function() {
    this.model.on('change', this.render, this);
    this.render();
  },

  template: _.template($('#chat-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes)).fadeIn('slow');
    return this;
  }

});