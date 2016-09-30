class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true
  belongs_to :user
  belongs_to :employer
  # 0 for permanent address and 1 for temporary address
  enum address_type: { permanent: 0, temporary: 1 }
  #validation
  validates :pincode, length: { is: 6 }, numericality: { only_integer: true }
  validates :street_1, :city, :state, :pincode, presence: true
end