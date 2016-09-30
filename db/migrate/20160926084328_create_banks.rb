class CreateBanks < ActiveRecord::Migration[5.0]
  def change
    create_table :banks do |t|
      t.string :bank_name, index: true
      t.integer :cheque_no
      t.date :date
      t.integer :micr_code
      t.string :rtgs
      t.integer :account_no
      t.string :account_type
      t.float :amount
      t.string :branch
      t.belongs_to :policy
      t.timestamps
    end
  end
end
