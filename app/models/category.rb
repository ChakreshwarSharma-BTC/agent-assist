class Category < ApplicationRecord
  has_many :company_categories
  has_many :companies, through: :company_categories

  #validation
  validates :name, presence: true

  scope :by_name, -> (search) { where('name ilike :name', name: "%#{search}%") }
end