class PersonalInfo < ApplicationRecord
  belongs_to :informable, polymorphic: true

  enum gender: { male: 0, female: 1 }

  validates :first_name, presence: true
  validates :middle_name, presence: true
  validates :last_name, presence: true
  validates :date_of_birth, presence: true
  validates :gender, presence: true
end