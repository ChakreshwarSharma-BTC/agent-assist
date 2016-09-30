class CompanyCategory < ApplicationRecord
  belongs_to :company
  belongs_to :category
  has_many :plans
end