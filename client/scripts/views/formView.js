var app = app || {};

app.FormView = Backbone.View.extend({
  tagName: 'input',
  el: '.something',

  template: _.template($('#input-template').html()),

  initialize: function() {
    this.render();
  },

  events: {
    'submit form': 'handleSubmit'
  },

  render: function () {
    this.$el.html(this.template);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var $text = $('#message');
    var $room = $('#room');
    var $user = $('#user');
    var timeStamp = new Date().toISOString();

    this.collection.create({
      username: $user.val(),
      text: $text.val(),
      room: $room.val(),
      createdAt: timeStamp
    });

    $text.val('');


  },


});