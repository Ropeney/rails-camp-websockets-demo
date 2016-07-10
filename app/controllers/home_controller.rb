class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    cookies.signed[:user_id] = current_user.id
    if params[:room].present?
      @room = [current_user.username, params[:room]].sort.join("-")
      @messages = Message.room(@room).includes(:user).order(created_at: :desc)
    else
      @messages = Message.room('main').includes(:user).order(created_at: :desc)
      @room = 'main'
    end
  end
end
