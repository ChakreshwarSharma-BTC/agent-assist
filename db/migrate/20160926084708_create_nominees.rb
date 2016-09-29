class CreateNominees < ActiveRecord::Migration[5.0]
  def change
    create_table :nominees do |t|
      t.string :relation
      t.belongs_to :policy

      t.timestamps
    end
  end
end
