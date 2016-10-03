class CreatePolicies < ActiveRecord::Migration[5.0]
  def change
    create_table :policies do |t|
      t.integer :mod_of_payment
      t.string :policy_number, index: true
      t.date :start_date, index: true
      t.date :end_date, index: true
      t.integer :premium_mod
      t.float :premium_amount
      t.float :total_amount
      t.date :renewal_date, index: true
      t.date :last_renewed_on
      t.integer :plan_type
      t.belongs_to :plan, foreign_key: true
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
