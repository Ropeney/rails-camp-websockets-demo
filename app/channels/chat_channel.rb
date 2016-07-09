# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat:chat_#{params[:room]}"
  end

  def receive(data)
    p data
    if Message.create(user: current_user, text: data["text"], room: data["room"])
      ChatChannel.broadcast_to("chat_#{data[:room]}", { user: current_user.email, text: data["text"]})
      p '*' * 100
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
