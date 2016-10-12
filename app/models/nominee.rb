class Nominee < ApplicationRecord
  belongs_to :policy
  has_one :personal_info, as: :informable
  accepts_nested_attributes_for :personal_info, allow_destroy: true

  #validation
  validates :relation, presence: true
  enum relation: { mother: 0, son: 1, father: 2, daughter: 3, brother: 4 }
  def self.formatted_relation
    relations.keys.map{ |j,k| [j.titleize, j]}
  end
end