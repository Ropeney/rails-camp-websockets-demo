$(document).ready(function() {
  var currentUser = $(".message-view").data("id");

  $('#send-message').click(function(e) {
    e.preventDefault();
    App.chat.send({text: $('#message-content').val()})
  });

  (function() {
    App.chat = App.cable.subscriptions.create({ channel: "ChatChannel" }, {
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
        var messageclass = "chat-line";
        if (currentUser === data["user"])
          messageClass = "my-chat-line";


        return "<div class='row-fluid'><article class=\"" + messageClass +
          "\">\n  <span class=\"speaker\">" +
          data["user"] + "</span>\n  <span class=\"body\">" + data["text"] +
          "</span>\n</article></div>";
      }
    });
  }).call(this);
});

