class Family < ApplicationRecord
  belongs_to :user
  belongs_to :family_member, dependent: :destroy
end