class CreatePolicies < ActiveRecord::Migration[5.0]
  def change
    create_table :policies do |t|
      t.integer :mod_of_payment
      t.integer :policy_number
      t.date :start_date
      t.date :end_date
      t.integer :premium_mod
      t.float :premium_amount
      t.float :total_amount
      t.date :renewal_date
      t.date :last_renewed_on
      t.integer :play_type
      t.integer :total_year
      t.belongs_to :plan, foreign_key: true
      t.timestamps
    end
  end
end
