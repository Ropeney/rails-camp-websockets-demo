class Message < ApplicationRecord
  belongs_to :user

  scope :room, ->(room) { where(room: room) }
end
