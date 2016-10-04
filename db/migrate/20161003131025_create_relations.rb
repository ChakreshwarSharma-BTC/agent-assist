class CreateRelations < ActiveRecord::Migration[5.0]
  def change
    create_table :relations do |t|
      t.string :relation_type
      t.string :string

      t.timestamps
    end
  end
end
