var app = app || {};

app.Message = Backbone.Model.extend({
  url: '/messages',
  idAttribute: '_id',
  defaults: {
    username: '',
    text: '',
    room: ''
  },

  parse: function (res) {
    res.createdAt = moment(res.createdAt).fromNow();
    return res;
  }
});