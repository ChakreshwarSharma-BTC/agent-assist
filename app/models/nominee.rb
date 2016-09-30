class Nominee < ApplicationRecord
  belongs_to :policy
  has_one :personal_info, as: :informable
  accepts_nested_attributes_for :personal_info, allow_destroy: true

  #validation
  validates :relation, presence: true
end