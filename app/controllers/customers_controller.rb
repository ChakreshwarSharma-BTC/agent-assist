class CustomersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_customer, except: [:index, :new, :create]
  before_action :set_family_member, only: [:show_member, :edit_member, :update_member, :destroy_member]

  def index
    @customers = User.with_role :customer
  end

  def edit
  end

  def show
    @family = @customer.family
  end

  def new
    @customer = User.new
  end

  def update
    @customer.update_attributes(customer_params)
    redirect_to customers_path 
  end

  def create
    customer = User.new(customer_params.merge!({password: Settings.user.password}))
    if customer.save!
      redirect_to agent_dashboard_path
    else
      render :new
    end
  end

  def new_member
    @family_member = FamilyMember.new
    render 'customers/family/new'
  end

  def create_member
    @family_member = FamilyMember.new(family_member_params)
    if @family_member.save
      Family.create(user_id: @customer.id, family_member_id: family_member.id)  
      redirect_to customer_path
    else
      render 'customers/family/new'
    end
  end

  def edit_member
    render 'customers/family/edit'
  end

  def update_member
    @family_member.update_attributes(family_member_params)
    redirect_to customer_path
  end

  def show_member
    render 'customers/family/show'
  end

  def destroy_member
    Family.find_by(family_member_id: params['member_id']).destroy!
    redirect_to customer_path
  end

  private
  def customer_params
    params.require(:user).permit(:email, :password, :password_confirmation, :is_active, :primary_phone_no, :user_type,
      personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender],
      family_member_attributes: [ { personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender ]}, :relation_with_customer, :health, :death_age, :death_year, :death_reason, :_destroy],
      address_attributes: [:street_1, :street_2, :city, :state, :pincode, :address_type])
  end

  def family_member_params
    params.require(:family_member).permit([personal_info_attributes:[:first_name, :middle_name, :last_name, :date_of_birth, :gender, :id]], :relation_with_customer, :health, :death_age, :death_year, :death_reason, :_destroy)
  end

  def set_customer
    @customer = User.find(params[:id])
  end

  def set_family_member
    @family_member = FamilyMember.find(params[:member_id])
  end
end