class Company < ApplicationRecord

  #Association
  has_many :company_categories
  #validation
  validates :name, presence: true
  validates :name, uniqueness: true
end