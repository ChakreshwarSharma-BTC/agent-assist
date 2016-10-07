class Nominee < ApplicationRecord
  belongs_to :policy
  has_one :personal_info, as: :informable
  accepts_nested_attributes_for :personal_info, allow_destroy: true

  #validation
  validates :relation, presence: true
  enum relation: { parents_ch: 0, children: 1, sifdbling: 2, sdspouse: 3 }
  def self.formatted_relation
    relations.keys.map{ |j,k| [j.titleize, j]}
  end
end