class LifeInsurances < ApplicationRecord
  belongs_to :family
  belongs_to :policy

  #validation
  validates :policy_term, :annual_income, presence: true

end