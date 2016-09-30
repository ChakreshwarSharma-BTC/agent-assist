class Company < ApplicationRecord
  #Association
  has_many :company_categories 
  has_many :categories, through: :company_categories
  #validation
  validates :name, presence: true, uniqueness: true
end