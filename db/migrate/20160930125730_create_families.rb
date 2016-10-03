class CreateFamilies < ActiveRecord::Migration[5.0]
  def change
    create_table :families do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :family_member, foreign_key: true

      t.timestamps
    end
  end
end
