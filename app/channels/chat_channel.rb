# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ChatChannel < ApplicationCable::Channel
  def subscribed
    p "subscribed"
    stream_from "chat:chat_a"
  end

  def receive(data)
    p "received stuff"
    ChatChannel.broadcast_to("chat_a", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
