class Lic < ApplicationRecord
  blongs_to :family
  blongs_to :policy
end