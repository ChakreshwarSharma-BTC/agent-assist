class CustomersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_customer, except: [:index, :new, :create, :filter_customers, :check_email, :existing_member, :member]
  before_action :set_family_member, only: [:show_member, :edit_member, :update_member, :destroy_member, :member]
  before_action :set_customers, only: [:index, :filter_customers, :existing_member]

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

  def existing_member
    @customers = @customers.joins(:family)
    render 'customers/existing_member/members'
  end

  def family_members
    @family_members = @customer.family_member
    render 'customers/existing_member/family_members'
  end

  def member
    customer_address = User.find(params[:customer_id]).address
    render json: { personal_info: @family_member.personal_info, address: customer_address }
  end

  def update
    if @customer.update_attributes(customer_params)
      flash[:success] = t('.success')
    else
      flash[:error] = @customer.errors.full_messages.to_sentence
    end
    redirect_to customers_path 
  end

  def create
    @customer = User.new(customer_params.merge!({password: Settings.user.password, created_by: current_user.id}))
    if @customer.save
      redirect_to customers_path
      flash[:success] = t('.success')
    else
      render :new
      flash[:error] = @customer.errors.full_messages.to_sentence
    end
  end

  def check_email
    @email = User.where(email: params[:email])
  end

  def destroy
    if @customer.destroy
      flash[:success] = t('.success')
    else
      flash[:error] = @customer.errors.full_messages.to_sentence
    end
    redirect_to customers_path
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
      flash[:success] = t('.success')
    else
      render 'customers/family/new'
      flash[:error] = @family_member.errors.full_messages.to_sentence
    end
  end

  def edit_member
    render 'customers/family/edit'
  end

  def update_member
    if @family_member.update_attributes(family_member_params)
      flash[:success] = t('.success')
    else
      flash[:error] = @family_member.errors.full_messages.to_sentence
    end
    redirect_to customer_path
  end

  def show_member
    @relation_with_customer = Relation.find(@family_member.relation_with_customer).relation_type
    render 'customers/family/show'
  end

  def destroy_member
    if Family.find_by(family_member_id: params['member_id']).destroy!
      flash[:success] = t('.success')
    else
      flash[:error] = @family_member.errors.full_messages.to_sentence
    end
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
    @customers = User.agent_customers(current_user)
  end

  def set_customer
    @customer = User.find(params[:id])
  end

  def set_family_member
    @family_member = FamilyMember.find(params[:member_id])
  end
end