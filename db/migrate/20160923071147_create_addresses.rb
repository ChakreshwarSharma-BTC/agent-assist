class CreateAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :addresses do |t|
      t.references :addressable, polymorphic: true, index: true
      t.references :user
      t.references :employer, default: ''
      t.string :street_1, default: ''
      t.string :street_2, default: ''
      t.string :city, null: false, default: ''
      t.string :state, null: false, default: ''
      t.string :pincode, null: false, default: ''
      t.integer :address_type, null: false, default: 0 #0 for permanent and 1 for temporary address.
      t.timestamps
    end
  end
end
