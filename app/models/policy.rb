class Policy < ApplicationRecord
  belongs_to :plan
  belongs_to :user

  # Payment method 0 for cash and 1 for cheque
  enum mod_of_payment: { cash: 0, cheque: 1 }

  # Premium mod 0 for quarterly 1 for half year 2 for yesrly
  enum premium_mod: { quarterly: 0, half_year: 1,  yearly: 2 }

  #validation
  validates :policy_number, :start_date, :end_date, :premium_amount, :total_amount, :renewal_date, :last_renewed_on, :total_year, presence: true
end
