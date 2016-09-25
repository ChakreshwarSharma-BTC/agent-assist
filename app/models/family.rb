class Family < ApplicationRecord
  belongs_to :user
  has_one :personal_info, as: :informable, dependent: :destroy
  accepts_nested_attributes_for :personal_info
end