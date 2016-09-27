class CreateVehicles < ActiveRecord::Migration[5.0]
  def change
    create_table :vehicles do |t|
      t.string :registration_number, unique: true
      t.string :name, index: true
      t.string :ncb
      t.boolean :idv_accessory
      t.boolean :electrical_accessory
      t.boolean :non_electrical_accessory
      t.belongs_to :policy, foreign_key: true
	  t.timestamps
    end
  end
end
