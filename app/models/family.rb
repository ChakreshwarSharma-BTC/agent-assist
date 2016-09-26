class Family < ApplicationRecord
  belongs_to :user
  has_many :personal_info, as: :informable, dependent: :destroy
  accepts_nested_attributes_for :personal_info
end