class CreateLifeInsurances < ActiveRecord::Migration[5.0]
  def change
    create_table :life_insurances do |t|
      t.integer :policy_term
      t.string :education_qualification
      t.float :annual_income
      t.boolean :term_rider
      t.boolean :critical_illness
      t.boolean :with_accident_cover
      t.belongs_to :policy, foreign_key: true
      t.belongs_to :family, foreign_key: true

      t.timestamps
    end
  end
end
