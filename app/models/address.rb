class Address < ApplicationRecord
  belongs_to :informable, polymorphic: true
  belongs_to :user
  belongs_to :employer

  # 0 for permanent address and 1 for temporary address
  enum address_type: { permanent: 0, temporary: 1 }
end