class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    cookies.signed[:user_id] = current_user.id
    @messages = Message.all.includes(:user).order(created_at: :desc)
  end
end
