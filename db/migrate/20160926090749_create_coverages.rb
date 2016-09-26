class CreateCoverages < ActiveRecord::Migration[5.0]
  def change
    create_table :coverages do |t|
      t.boolean :pakage
      t.boolean :fire_only
      t.boolean :fire_with_liabillity
      t.boolean :theft_only
      t.boolean :theft_with_liability
      t.boolean :fire_and_theft_only
      t.boolean :fire_and_theft_with_liability

      t.timestamps
    end
  end
end
