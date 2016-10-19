class CustomersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_customer, except: [:index, :new, :create, :filter_customers, :check_email]
  before_action :set_family_member, only: [:show_member, :edit_member, :update_member, :destroy_member]
  before_action :set_customers, only: [:index, :filter_customers]

  def index
    @customers = paginated(@customers)
    respond_to do |format|
      format.html { render 'customers/index' }
      format.js { render 'customers/filter_customers' }
    end
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
    if @customer.update_attributes(customer_params)
      flash[:success] = "You have updated customer successfully!"
    else
      flash[:error] = "You have not updated customer successfully!"
    end
    redirect_to customers_path 
  end

  def create
    @customer = User.new(customer_params.merge!({password: Settings.user.password}))
    if @customer.save
      redirect_to customers_path
      flash[:success] = "You have created customer successfully!"
    else
      render :new
      flash[:error] = "You have not created customer successfully!"
    end
  end

  def check_email
    @email = User.where(email: params[:email])
  end

  def destroy
    if @customer.destroy!
      redirect_to customers_path 
    end
  end

  def new_member
    @family_member = FamilyMember.new
    render 'customers/family/new'
  end

  def create_member
    @family_member = FamilyMember.new(family_member_params)
    if @family_member.save
      Family.create(user_id: @customer.id, family_member_id: @family_member.id)  
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
    @relation_with_customer = Relation.find(@family_member.relation_with_customer).relation_type
    render 'customers/family/show'
  end

  def destroy_member
    Family.find_by(family_member_id: params['member_id']).destroy!
    redirect_to customer_path
  end

  def filter_customers
    @customers = @customers.search_by_name(params[:customer_name]) if params[:customer_name].present?
    @customers = @customers.search_by_email(params[:email]) if params[:email].present?
    @customers = @customers.select('personal_infos.first_name, users.*').joins(:personal_info) if params[:sort] == 'first_name'
    @customers = sort_and_paginate(@customers) if @customers.present?
    render 'customers/filter_customers'
  end

  private
  def customer_params
    params.require(:user).permit(:email, :password, :password_confirmation, :is_active, :primary_phone_no, :user_type,
      personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender, :id],
      family_member_attributes: [ { personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender]}, :relation_with_customer, :health, :death_age, :death_year, :death_reason, :_destroy],
      address_attributes: [:street_1, :street_2, :city, :state, :pincode, :address_type])
  end

  def family_member_params
    params.require(:family_member).permit([personal_info_attributes:[:first_name, :middle_name, :last_name, :date_of_birth, :gender, :id]], :relation_with_customer, :health, :death_age, :death_year, :death_reason, :_destroy)
  end

  def set_customers
    @customers = User.with_role :customer
  end

  def set_customer
    @customer = User.find(params[:id])
  end

  def set_family_member
    @family_member = FamilyMember.find(params[:member_id])
  end
end