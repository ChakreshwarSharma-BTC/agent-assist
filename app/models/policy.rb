class Policy < ApplicationRecord
  belongs_to :plan
  has_one :bank
  has_one :medical_history
  has_one :vehicle
  has_one :employer
  has_one :lic
  has_one :nominee 
  has_one :personal_info, as: :personal_infoable

  # 0 for Quarterly, 1 for half_year and 2 for yearly premium mod
  enum premium_mod: { quarterly: 0, half_year: 1, yearly: 2 }
end
