class Plan < ApplicationRecord
  belongs_to :company_category
  #validation
  #validates :name, presence: true
end