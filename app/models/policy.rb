class Policy < ApplicationRecord
  belongs_to :plan
  has_one :bank
  has_one :medical_history
  has_one :vehicle
  has_one :employer
  has_one :life_insurances
  has_one :nominee 
  has_one :personal_info, as: :informable, dependent: :destroy
  has_one :user
  has_one :address, as: :addressable, dependent: :destroy
  accepts_nested_attributes_for :life_insurances
  accepts_nested_attributes_for :vehicle
  accepts_nested_attributes_for :personal_info
  accepts_nested_attributes_for :plan
  accepts_nested_attributes_for :address
   # 0 for Quarterly, 1 for half_year and 2 for yearly premium mod
   enum premium_mod: { quarterly: 0, half_year: 1, yearly: 2 } 
end
