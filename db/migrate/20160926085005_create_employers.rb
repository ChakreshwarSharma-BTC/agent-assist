class CreateEmployers < ActiveRecord::Migration[5.0]
  def change
    create_table :employers do |t|
      t.string :name_of_office, index: true
      t.integer :how_long
      t.integer :plan_type
      t.belongs_to :policy, foreign_key: true

      t.timestamps
    end
  end
end
