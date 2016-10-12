class Plan < ApplicationRecord
  has_many :policies
  belongs_to :company_category
end