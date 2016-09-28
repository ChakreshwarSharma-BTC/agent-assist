class LifeInsurances < ApplicationRecord
  belongs_to :family
  belongs_to :policy
end