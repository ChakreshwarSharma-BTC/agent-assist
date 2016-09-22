class User < ApplicationRecord
  rolify
  after_create :assign_role
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :personal_info, as: :informable, dependent: :destroy
  accepts_nested_attributes_for :personal_info

  validates :primary_phone_no, presence: true

  def assign_role
    add_role :agent if roles.blank?
  end
end