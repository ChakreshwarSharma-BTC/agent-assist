class FamilyMember < ApplicationRecord
  belongs_to :user
  has_one :family
  has_many :personal_info, as: :informable, dependent: :destroy
  accepts_nested_attributes_for :personal_info
  has_and_belongs_to_many :life_insurances

  #validation
  validates :health, presence: true
end