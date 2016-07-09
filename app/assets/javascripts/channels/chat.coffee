console.log("hello")
App.chat = App.cable.subscriptions.create { channel: "ChatChannel" },
  received: (data) ->
    console.log("received", data)
    @appendLine(data)
    new Notification data["title"], body: data["body"]

  appendLine: (data) ->
    console.log("line appended")
    html = @createLine(data)
    $("#a").append(html)

  createLine: (data) ->
    console.log("line created")
    """
      <article class="chat-line">
        <span class="speaker">#{data["sent_by"]}</span>
        <span class="body">#{data["body"]}</span>
      </article>
    """

