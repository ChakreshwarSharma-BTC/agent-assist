class AddCreatedByInPolicy < ActiveRecord::Migration[5.0]
  def change
    add_column :policies, :created_by, :integer
  end
end
