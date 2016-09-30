class Policy < ApplicationRecord
  belongs_to :plan
  belongs_to :user
  has_one :bank
  has_one :medical_history
  has_one :vehicle   
  has_one :employer
  has_one :nominee
  has_one :life_insurances
  has_one :personal_info, as: :informable, dependent: :destroy
  has_one :address, as: :informable, dependent: :destroy

  accepts_nested_attributes_for :vehicle
  accepts_nested_attributes_for :personal_info   
  accepts_nested_attributes_for :plan    
  accepts_nested_attributes_for :address
  accepts_nested_attributes_for :life_insurances

  # 0 for floater, 1 for individual and 2 for group plan type
  enum plan_type: { floater: 0, individual: 1, policy_group: 2 }

  # Payment method 0 for cash and 1 for cheque
  enum mod_of_payment: { cash: 0, cheque: 1 }

  # Premium mod 0 for quarterly 1 for half year 2 for yesrly
  enum premium_mod: { quarterly: 0, half_year: 1,  yearly: 2 }

  #validation
  validates :policy_number, :start_date, :end_date, :premium_amount, :total_amount, :renewal_date, :last_renewed_on, :total_year, presence: true
end
