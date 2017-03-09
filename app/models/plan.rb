class Plan < ApplicationRecord
  has_many :policies
  belongs_to :company_category
  scope :by_name, -> (search) { where('name ilike :name', name: "%#{search}%") }
end