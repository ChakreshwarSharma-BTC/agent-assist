class Policy < ApplicationRecord
  belongs_to :plan
  has_one :bank
  has_one :medical_history
  has_one :vehicle
  has_one :employer
  has_one :lic
  has_one :nominee 
  has_one :personal_info, as: :informable, dependent: :destroy
  has_one :user
  has_one :address, as: :informable, dependent: :destroy
  accepts_nested_attributes_for :vehicle
  accepts_nested_attributes_for :personal_info
  accepts_nested_attributes_for :plan
  accepts_nested_attributes_for :address
end
