class CreateFamilies < ActiveRecord::Migration[5.0]
  def change
    create_table :families do |t|
      t.references :user
      t.string :health, null: false, default: ''
      t.integer :death_age, null: false
      t.date :death_year, null: false
      t.string :death_reason, null: false, default: ''
      t.timestamps
    end
  end
end
