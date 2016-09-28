class Lic < ApplicationRecord
  belongs_to :family
  belongs_to :policy
end