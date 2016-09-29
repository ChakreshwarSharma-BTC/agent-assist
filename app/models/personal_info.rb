class PersonalInfo < ApplicationRecord
  belongs_to :informable, polymorphic: true

  # 0 for male and 1 for female
  enum gender: { male: 0, female: 1 }
  validates :first_name, :middle_name, :last_name, :date_of_birth, :gender, presence: true
end