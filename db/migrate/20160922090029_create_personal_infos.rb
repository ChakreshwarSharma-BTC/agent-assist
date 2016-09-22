class CreatePersonalInfos < ActiveRecord::Migration[5.0]
  def change
    create_table :personal_infos do |t|
      t.references :informable, polymorphic: true, index: true
      t.string :first_name, null: false, default: ''
      t.string :middle_name, null: false, default: ''
      t.string :last_name, null: false, default: ''
      t.date :date_of_birth
      t.integer :gender, null: false, default: 0 #0 is for male 1 is for female
      t.timestamps
    end
  end
end