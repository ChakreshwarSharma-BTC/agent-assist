class CreateFamilyMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :family_members do |t|
      t.string :health
      t.integer :death_age
      t.date :death_year
      t.string :death_reason
      t.integer :relation_with_customer

      t.timestamps
    end
  end
end
