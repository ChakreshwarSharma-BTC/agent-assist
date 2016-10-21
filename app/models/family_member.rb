class FamilyMember < ApplicationRecord
  has_one :user, through: :family
  has_one :personal_info, as: :informable, dependent: :destroy
  accepts_nested_attributes_for :personal_info

  #validation
  validates :health, presence: true
end