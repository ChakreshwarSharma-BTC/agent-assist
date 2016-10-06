class PoliciesController < ApplicationController
  before_action :authenticate_user!
  before_action :new_policy,only: [:new, :user_list, :category_fields]
  before_action :policies_params, only: [:create, :update]
  before_action :set_policy, only: [:edit, :update , :destroy]
  def new
  end

  def index
    if (params[:search])
      @policies = Policy.search(params[:search]).order(created_at: :asc)
      @policies = paginated(Policy.search(params[:search]).order(created_at: :asc))
    else
      @policies = Policy.all.order(created_at: :asc)
      @policies = paginated(Policy.all.order(created_at: :asc))
    end
  end

  def edit
    @category_id = @policy.plan.company_category_id
  end

  def show
  end

  def create
    @policy= Policy.new(policies_params)
    # user_id = User.find_or_create_by(email: params[:policy][:user_attributes][:email]).id
    # @policies.user_id = user_id
    if @policy.save
      @policy.address.user_id=@policy.user_id
      redirect_to  policies_path
      flash[:success] = t('.success')

    else
      flash[:error] = @policy.errors.full_messages.to_sentence
      render :new
    end
  end

  def update
    if @policy.update(policies_params)
      flash[:success] = t('.success')
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
  
  def user_list
    @user=User.find_by(id: params[:user_id])
  end

  def category_fields
    @category =params[:category]
  end

  def new_policy
    @policy = Policy.new
  end

  def policy_reminder
    @policy = paginated(Policy.policy_desc_order)
    @policies_expire = @policy.weekly_expire_policy
    @policy_all = @policy - @policies_expire
  end

  private
  def policies_params
    params.require(:policy).permit(:mod_of_payment, :policy_number, :start_date, :end_date, :premium_mode, :premium_amount, :total_amount, :renewal_date, :last_renewed_on, :play_type, :plan_id, :user_id, :city, :state, :pincode, :street_1, :street_2,
     personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender],
     vehicle_attributes: [:registration_number, :name, :ncb, :idv_accessory, :electrical_accessory, :non_electrical_accessory],
     address_attributes: [:city, :state, :pincode, :street_1, :street_2],
     life_insurance_attributes: [:policy_term, :education_qualification, :annual_income, :term_rider, :critical_illness, :with_accident_cover],
     nominee_attributes: [ :relation,{ personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender ]}])
  end

  def set_policy
    @policy = Policy.find(params[:id])
  end
end