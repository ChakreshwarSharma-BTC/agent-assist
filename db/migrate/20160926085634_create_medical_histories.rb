class CreateMedicalHistories < ActiveRecord::Migration[5.0]
  def change
    create_table :medical_histories do |t|
      t.string :height
      t.string :weight
      t.string :abd
      t.string :chest
      t.string :identification_mark
      t.date :date
      t.string :operation_detail
      t.belongs_to :policy, foreign_key: true
      t.timestamps
    end
  end
end
