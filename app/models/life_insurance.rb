class LifeInsurance < ApplicationRecord
  belongs_to :family
  belongs_to :policy

  #validation
  validates :policy_term, :education_qualification, :annual_income, presence: true

end
