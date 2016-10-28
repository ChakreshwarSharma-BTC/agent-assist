class PoliciesController < ApplicationController
  before_action :authenticate_user!
  before_action :new_policy, only: [:new, :customer_list, :category_fields, :companies, :plans]
  before_action :set_policy , only: [:show , :edit, :update , :destroy]
  before_action :set_policies, only: [:index, :filter_policies]

  def new
    @plan = @policy.build_plan
    @address = @policy.address.build
    @life_insurance = @policy.build_life_insurance
    @vehicle = @policy.build_vehicle
    @user = @policy.build_user
    @personal_info = @policy.build_personal_info
    @nominee = @policy.build_nominee
    @nominee_personal_info = @nominee.build_personal_info
  end

  def index
    @policies = paginated(@policies)
    respond_to do |format|
      format.html { render 'policies/index' }
      format.js { render 'policies/filter_policies' }
    end
  end

  def edit
    @category_id = @policy.plan.company_category.category_id
    @company_id = @policy.plan.company_category.company_id
    @plan_id = @policy.plan_id
    @companies = Category.find(@company_id).companies
    company_categories = CompanyCategory.find_by(company: @company_id, category_id: @category_id)
    @plans = company_categories.plans
    @nominee = @policy.nominee
  end

  def show
  end

  def policy_user
    user_attributes = params[:policy][:user_attributes]
    personal_info = params[:policy][:personal_info_attributes].permit!
    @email_found = User.where(email: user_attributes[:email]).count > 0
    @user = User.find_or_create_by(email: user_attributes[:email]) do |u|
      u.password = Settings.user.password
      u.primary_phone_no = user_attributes[:primary_phone_no]
      u.add_role :customer
      u.personal_info = PersonalInfo.new(personal_info)
      if u.address.blank?
        address_attributes = params[:policy][:address_attributes].permit!
        u.address.new([address_attributes['0'], address_attributes['1']])
      end
    end
  end

  def create
    policy = Policy.new(policies_params.merge!({created_by: current_user.id}))
    policy.user = policy_user
    policy.renewal_date = Date.today
    if policy.save
      redirect_to policies_path
      flash[:success] = t('.success')
    else
      flash[:error] = policy.errors.full_messages.to_sentence
      render :new
    end
  end

  def policy_number
    @policy = Policy.where(policy_number: params[:policy_number])
  end

  def update
    if @policy.update_attributes(policies_params)
      flash[:success] = t('.success')
      AgentMailer.update_policy(@policy, current_user).deliver_now
    else
      flash[:error] = @policy.errors.full_messages.to_sentence
    end
    redirect_to policies_path
  end

  def destroy
    if @policy.destroy
      flash[:success] = t('.success')
    else
      flash[:error] = @policy.errors.full_messages.to_sentence
    end
    redirect_to policies_path
  end
  
  def customer_list
    user = @policy.build_user
    personal_info = @policy.build_personal_info
    @user = User.find(params[:id])
    respond_to do |format|
      format.json  { render :json => {user: @user, 
                                  personal_info: @user.personal_info, address: @user.address }}
    end
  end

  def companies
    @companies = Category.find(params[:category]).companies
  end

  def plans
    company_categories = CompanyCategory.find_by(company: params[:company], category_id: params[:category])
    @plans = company_categories.plans
  end

  def new_policy
    @policy = Policy.new
  end

  def policy_reminder
    @policy = paginated(Policy.order("end_date ASC"))
  end

  def update_notification
    current_user.update(notification: true)
  end

  def filter_policies
    @policies = @policies.search_by_policy_number(params[:policy_number]) if params[:policy_number].present?
    @policies = @policies.search_by_date(params[:date].to_date) if params[:date].present?
    @policies = @policies.select('plans.company_category_id, policies.*').joins(:plan) if params[:sort] == 'company_category_id'
    @policies = sort_and_paginate(@policies) if @policies.present?
    render 'policies/filter_policies'
  end

  private
  def policies_params
    params.require(:policy).permit(
     :id, :mod_of_payment, :policy_number, :start_date, :end_date, :premium_mode, :premium_amount, :premium_mod, :total_amount, :renewal_date, :last_renewed_on, :play_type, :plan_id, :user_id,
     user_attributes: [:id, :email, :primary_phone_no],
     personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender, :id],
     vehicle_attributes: [:registration_number, :name, :ncb, :idv_accessory, :electrical_accessory, :non_electrical_accessory, :id],
     address_attributes: [:id, :city, :state, :pincode, :street_1, :street_2, :address_type],
     life_insurance_attributes: [:policy_term, :education_qualification, :annual_income, :term_rider, :critical_illness, :with_accident_cover, :id],
     nominee_attributes: [:id, :relation,{ personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender, :id ]}])
  end

  def set_policy
    @policy = Policy.find(params[:id])
  end

  def set_policies
    @policies = Policy.agent_policies(current_user)
  end
end