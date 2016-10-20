class Policy < ApplicationRecord
  belongs_to :plan
  accepts_nested_attributes_for :plan  
  belongs_to :user, counter_cache: true
  accepts_nested_attributes_for :user
  has_one :bank
  has_one :medical_history
  has_one :vehicle  
  accepts_nested_attributes_for :vehicle
  has_one :employer
  has_one :nominee
  accepts_nested_attributes_for :nominee
  has_one :life_insurance, dependent: :destroy
  accepts_nested_attributes_for :life_insurance
  has_one :personal_info, as: :informable, dependent: :destroy
  accepts_nested_attributes_for :personal_info
  has_many :address, as: :addressable, dependent: :destroy  # policy can have temporary and permanent address  
  accepts_nested_attributes_for :address
  
  # 0 for floater, 1 for individual and 2 for group plan type
  enum plan_type: { floater: 0, individual: 1, policy_group: 2 }

  # Payment method 0 for cash and 1 for cheque
  enum mod_of_payment: { cash: 0, cheque: 1 }

  # Premium mod 0 for quarterly 1 for half year 2 for yesrly
  enum premium_mod: { quarterly: 0, half_year: 1,  yearly: 2 }

  #validation
   validates :start_date, :end_date, :premium_amount, :total_amount, presence: true
   validates :policy_number, uniqueness: true, presence: true

  #cout the policy
  scope :policy_count, -> {count}
  #count renewal policy
  scope :policy_renewal, -> {where(renewal_date: Date.current - Settings.policy.day)}
  scope :search_by_policy_number, ->(search) { where('policy_number like :policy_number', policy_number: "%#{search}%") }  
  scope :search_by_date, ->(search) { where('start_date LIKE :start_date or end_date LIKE :end_date or renewal_date LIKE :renewal_date', start_date: "%#{search}%", end_date: "%#{search}%", renewal_date: "%#{search}%")}  
  scope :company_category, -> (company_category_ids) { joins(:plan).where('company_category_id in :ids', ids: company_category_ids) }

  # Weekly premium date
  def self.weekly_premium_date
    date_range = (Date.today...Settings.policy.day.days.from_now)
    Policy.all.each do |policy|
      policy if date_range.include?(policy.renewal_date)
    end
  end

  def self.formatted_mod_of_payment
    mod_of_payments.keys.map{ |j,k| [j.titleize, j]}
  end
  
  def self.formatted_premium_mod
    premium_mods.keys.map{ |j,k| [j.titleize, j]}
  end

  def self.formatted_plan_type
    plan_types.keys.map{ |j,k| [j.titleize, j]}
  end
  def self.search(search)
    if search
      joins(:plan).where('name LIKE ?', "%#{search}%")
    else
      scoped
    end
  end
end