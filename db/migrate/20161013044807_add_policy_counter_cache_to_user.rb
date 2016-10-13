class AddPolicyCounterCacheToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :policies_count, :integer
  end
end
