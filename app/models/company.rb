class Company < ApplicationRecord
  #Association
  has_many :company_categories 
  has_many :categories, through: :company_categories
  #validation
  validates :name, presence: true, uniqueness: true
  #scope count the company
  scope :company_count, -> {count}
  scope :by_name, -> (search) { where('name ilike :name', name: "%#{search}%") }
end