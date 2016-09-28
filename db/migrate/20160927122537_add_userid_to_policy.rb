class AddUseridToPolicy < ActiveRecord::Migration[5.0]
  def change
    add_column :policies, :user_id, :integer
  end
end
