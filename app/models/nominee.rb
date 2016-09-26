class Nominee < ApplicationRecord
  belongs_to :policy
  has_one :personal_info, as: :personal_infoable
end
