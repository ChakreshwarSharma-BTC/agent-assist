class Employer < ApplicationRecord
  belongs_to :policy
  has_one :address

  #validation
  validates :name_of_office, :how_long, presence: true
end
