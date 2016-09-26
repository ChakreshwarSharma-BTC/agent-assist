class Policy < ApplicationRecord
  belongs_to :plan
  has_one :bank
  has_one :medical_history
  has_one :vehicle
  has_one :employer
  has_one :lic
  has_one :nominee 
  has_one :personal_info, as: :personal_infoable
end
