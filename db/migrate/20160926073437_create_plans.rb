class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    create_table :plans do |t|
      t.string :name, index: true
      t.belongs_to :company_category, foreign_key: true
      t.timestamps
    end
  end
end
