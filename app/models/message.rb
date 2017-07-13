class Message < ApplicationRecord
  belongs_to :user
  belongs_to :reeiver, class_name: 'User'

  scope :room, ->(room) { where(room: room) }
end
