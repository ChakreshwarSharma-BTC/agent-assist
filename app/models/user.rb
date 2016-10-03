class User < ApplicationRecord
  rolify
  after_create :assign_role
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :policy
  has_one :personal_info, as: :informable, dependent: :destroy
  has_one :user_profile
  has_one :family, dependent: :destroy
  has_many :address, as: :addressable, dependent: :destroy
  accepts_nested_attributes_for :personal_info, :family, :address

  attr_accessor :user_type
  # validation
  validates :email, presence: true, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :primary_phone_no, presence: true, numericality: true, length: {is: 10}

  def assign_role
    if roles.blank? && user_type.blank?
      add_role :agent
    else
      add_role user_type if user_type.present?
    end
  end
end