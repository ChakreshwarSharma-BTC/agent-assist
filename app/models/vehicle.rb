class Vehicle < ApplicationRecord
  belongs_to :policy
  has_and_belongs_to_many :coverages
end
