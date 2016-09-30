class Employer < ApplicationRecord
  belongs_to :policy
  has_one :address
  #validation
  validates :name_of_office, :how_long_working, presence: true
end
