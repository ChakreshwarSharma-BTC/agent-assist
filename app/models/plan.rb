class Plan < ApplicationRecord
  belongs_to :company_categories

  # 0 for floater, 1 for individual and 2 for group plan type
  enum plan_type: { floater: 0, individual: 1, group: 2 }

  #validation
  validates :name, presence: true
end
