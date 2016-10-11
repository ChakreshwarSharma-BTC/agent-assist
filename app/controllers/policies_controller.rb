class PoliciesController < ApplicationController
  before_action :authenticate_user!
  before_action :new_policy, only: [:new, :customer_list, :category_fields, :companies, :plans]
  before_action :set_policy , only: [:show ,:edit, :update , :destroy]

  def new
    @plan = @policy.build_plan
    @address = @policy.build_address
    @life_insurance = @policy.build_life_insurance
    @vehicle = @policy.build_vehicle
    @user = @policy.build_user
    @personal_info = @policy.build_personal_info
    @nominee = @policy.build_nominee
    @nominee_personal_info = @nominee.build_personal_info
  end

  def index
    @policies = Policy.all.order(created_at: :asc)
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

  def new_user
    user_attributes = params[:policy][:user_attributes]
    personal_info = params[:policy][:personal_info_attributes].permit!
    @user = User.find_or_create_by(email: user_attributes[:email]) do |u|
      u.password = Settings.user.password
      u.primary_phone_no = user_attributes[:primary_phone_no]
      u.add_role :customer
      u.personal_info = PersonalInfo.new(personal_info)
    end
  end

  def create
    policy= Policy.new(policies_params)
    new_user
    policy.user = @user
    if policy.save!
      redirect_to policies_path
      flash[:success] = t('.success')
    else
      flash[:error] = policy.errors.full_messages.to_sentence
      render :new
    end
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
      format.json  { render :json => {:user => @user, 
                                  :personal_info => @user.personal_info }}
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
    if @policy.present?
      @policy = paginated(Policy.policy_desc_order)
      @policies_expire = @policy.weekly_expire_policy
      @policy_all = @policy - @policies_expire
    end
  end

  def search
    if params[:search].present?
      @policy = Policy.search_by_name(params[:search])
      @company = Company.find_by(name: params[:search])
      if @company.present?
        ids = @company.company_categories.ids
        @policy = Policy.company_category(ids)
      end
      @category = Category.find_by(name: params[:search])
      if @category.present?
        ids = @category.company_categories.ids
        @policy = Policy.company_category(ids)
      end 
    end
  end

  private
  def policies_params
    params.require(:policy).permit(
     :id, :mod_of_payment, :policy_number, :start_date, :end_date, :premium_mode, :premium_amount, :premium_mod, :total_amount, :renewal_date, :last_renewed_on, :play_type, :plan_id, :user_id,
     user_attributes: [:id, :email, :primary_phone_no],
     personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender, :id],
     vehicle_attributes: [:registration_number, :name, :ncb, :idv_accessory, :electrical_accessory, :non_electrical_accessory, :id],
     address_attributes: [:id, :city, :state, :pincode, :street_1, :street_2],
     life_insurance_attributes: [:policy_term, :education_qualification, :annual_income, :term_rider, :critical_illness, :with_accident_cover, :id],
     nominee_attributes: [:id, :relation,{ personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender, :id ]}])
  end

  def set_policy
    @policy = Policy.find(params[:id])
  end
end