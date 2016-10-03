class Family < ApplicationRecord
  belongs_to :user
  has_many :personal_info, as: :informable, dependent: :destroy
  accepts_nested_attributes_for :personal_info
  has_and_belongs_to_many :life_insurance

  #validation
  validates :health, :death_age, :death_year, :death_reason, presence: true
end