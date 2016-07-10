# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat:chat_#{params[:room]}"
  end

  def receive(data)
    message = ERB::Util.html_escape(data["text"])
    message = message.gsub(/(?:\n\r?|\r\n?)/, '<br>').truncate(500)

    if Message.create(user: current_user, text: message, room: data["room"])
      ChatChannel.broadcast_to("chat_#{data["room"]}", { user: current_user.username,
        text: message})
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
