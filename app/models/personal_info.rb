class PersonalInfo < ApplicationRecord
  belongs_to :informable, polymorphic: true

  # 0 for male and 1 for female
  enum gender: { male: 0, female: 1 }

  validates :first_name, presence: true
  validates :middle_name, presence: true
  validates :last_name, presence: true
  validates :date_of_birth, presence: true
  validates :gender, presence: true

  def full_name
  	"#{first_name} #{middle_name} #{last_name}"
  end
end