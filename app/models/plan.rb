class Plan < ApplicationRecord
  belongs_to :company_categories

  #validation
  validates :name, presence: true
end
