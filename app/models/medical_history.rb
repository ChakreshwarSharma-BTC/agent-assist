class MedicalHistory < ApplicationRecord
  blongs_to :policy

  #validation
  validates :height, :weight, :abd, :chest, :identification_mark, :date, :operation_detail, presence: true
end
