class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    create_table :plans do |t|
      t.string :name
      t.belongs_to :company_categories, foreign_key: true

      t.timestamps
    end
  end
end
