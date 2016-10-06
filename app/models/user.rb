class User < ApplicationRecord
  rolify
  after_create :assign_role
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :family, dependent: :destroy
  has_many :family_member, through: :family, dependent: :destroy
  has_many :policy
  has_many :address, as: :addressable, dependent: :destroy
  has_one :personal_info, as: :informable, dependent: :destroy
  has_one :user_profile

  accepts_nested_attributes_for :personal_info, :family_member, :address
  scope :do_not_disturb, ->(current_user) { current_user.update_attributes(notification: true) }
  attr_accessor :user_type
  # validation
  validates :email, presence: true, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :primary_phone_no, presence: true, numericality: true, length: {is: 10}
  #cout the user
  scope :user_count, -> {count}

  scope :search_by_name, ->(search) { joins(:personal_info).where("personal_infos.first_name like :first_name or personal_infos.last_name like :last_name or concat(personal_infos.first_name, ' ', personal_infos.last_name) like :full_name", first_name: "%#{search}%", last_name: "%#{search}%", full_name: "%#{search}%") }
  scope :search_by_email, ->(search) { where('email like :email', email: "%#{search}%") }

  def assign_role
    if roles.blank? && user_type.blank?
      add_role :agent
    else
      add_role user_type if user_type.present?
    end
  end
  def full_name_with_email
    if personal_info.present?
      "#{personal_info.first_name} #{personal_info.middle_name} #{personal_info.last_name} #{email}"
    end
  end
end