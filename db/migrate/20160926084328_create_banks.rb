class CreateBanks < ActiveRecord::Migration[5.0]
  def change
    create_table :banks do |t|
      t.string :bank_name
      t.integer :cheque_no
      t.date :date
      t.integer :micr_code
      t.string :rfgs
      t.integer :account_no
      t.string :account_type
      t.float :amount
      t.string :branch
      t.belongs_to :policy, foreign_key: true
      t.timestamps
    end
  end
end
