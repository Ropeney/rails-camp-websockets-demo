class AddReceipientToMessage < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :receiver_id, :receiver
    add_index :messages, :receiver_id
  end
end
