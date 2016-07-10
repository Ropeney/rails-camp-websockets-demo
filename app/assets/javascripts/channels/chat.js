$(document).ready(function() {
  var userDetails = $(".user-details");
  var currentUser = userDetails.data("id");
  console.log(currentUser);
  var room = userDetails.data('room');

  var message_box = $("#send-message");
  if (message_box.length) {
    message_box.click(function(e) {
      e.preventDefault();
      var message = $('#message-content');
      App.chat.send({text: message.val(), room: room})
      message.val('');
    });


    $("#message-content").keyup(function(e) {
      if(e.keyCode == 13 && !e.shiftKey) {
        message_box.trigger("click");
      }
    });
  }

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
        $("#messages").prepend("<div id='replaceMe'></div>");
        ReactDOM.render(html, document.getElementById("replaceMe"));
        return $("#messages").prepend(html);
      },

      createLine: function(data) {
        var messageClass = "chat-line";
        if (currentUser === data["user"])
          messageClass = "my-chat-line";


        messageItem = React.createElement(MessageItem,
          { username: data["user"], message: data["text"], classType: messageClass });

        return messageItem;
      }
    });
  }).call(this);
});

