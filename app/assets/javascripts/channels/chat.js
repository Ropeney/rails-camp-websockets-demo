$(document).ready(function() {
  var userDetails = $(".user-details");
  var currentUser = userDetails.data("id");
  console.log(currentUser);
  var room = userDetails.data('room');

  $('#send-message').click(function(e) {
    e.preventDefault();
    var message = $('#message-content');
    App.chat.send({text: message.val(), room: room})
    message.val('');
  });

  (function() {
    App.chat = App.cable.subscriptions.create({ channel: "ChatChannel", room: room }, {
      received: function(data) {
        this.appendLine(data);
        return new Notification(data["user"], {
          body: data["message"]
        });
      },
      appendLine: function(data) {
        var html;
        html = this.createLine(data);
        return $("#messages").prepend(html);
      },
      createLine: function(data) {
        var messageClass = "chat-line";
        if (currentUser === data["user"])
          messageClass = "my-chat-line";


        return "<div class='row-fluid'><article class=\"" + messageClass +
          "\">\n" + "<span class=\"thumb\"><img src=\"http:///www.twetter.local/avatars/original/missing.png\" /></span><span class=\"content\">" +
          "<span class=\"speaker\">" + "<a href='http://localhost:3000/?room=" +
          data["user"] + "'>" + data["user"] + "</a></span>\n  <span class=\"body\">" + data["text"] +
          "</span></span>\n</article></div>";
      }
    });
  }).call(this);
});

