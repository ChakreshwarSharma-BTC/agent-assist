class Vehicle < ApplicationRecord
  belongs_to :policy
  has_and_belongs_to_many :coverages

  #validation
  validates :registration_number, presence: true, uniqueness: true
  validates :name, :ncb, presence: true
end
