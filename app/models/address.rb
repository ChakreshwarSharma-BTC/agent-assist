class Address < ApplicationRecord
  belongs_to :user
  enum address_type: { permanent: 0, temporary: 1 }
  belongs_to :employer
end