# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat:chat_a"
  end

  def receive(data)
    if Message.create(user: current_user, text: data["text"])
      ChatChannel.broadcast_to("chat_a", { user: current_user.email, text: data["text"]})
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
