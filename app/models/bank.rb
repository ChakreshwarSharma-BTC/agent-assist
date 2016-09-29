class Bank < ApplicationRecord
  blongs_to :policy

  #validation
  validates :bank_name, :cheque_no, :account_no, presence: true, uniqueness: true
  validates :date, :micr_code, :rtgs, :account_type, :amount, :branch, presence: true
end