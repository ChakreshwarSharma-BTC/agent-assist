class CreateVehicleCoverage < ActiveRecord::Migration[5.0]
  def change
    create_table :vehicle_coverages do |t|
      t.belongs_to :vehicle, foreign_key: true
      t.belongs_to :coverage, foreign_key: true
    end
  end
end
