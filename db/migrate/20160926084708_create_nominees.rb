class CreateNominees < ActiveRecord::Migration[5.0]
  def change
    create_table :nominees do |t|
      t.string :relation
      t.belongs_to :policy, foreign_key: true

      t.timestamps
    end
  end
end
