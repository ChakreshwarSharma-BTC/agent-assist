class Employer < ApplicationRecord
  belongs_to :policy
  has_one :address
end
