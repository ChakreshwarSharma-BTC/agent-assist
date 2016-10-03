class CustomersController < ApplicationController
  before_action :authenticate_user!

  def new
    @customer = User.new
  end

  def create
    customer = User.new(customer_params)
    customer.password = Settings.user.password
    if customer.save!
      redirect_to agent_dashboard_path
    else
      render :new
    end
  end

  private
  def customer_params
    params.require(:user).permit(:email, :password, :password_confirmation, :is_active, :primary_phone_no, :user_type,
      personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender],
      family_member_attributes: [ { personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender ]}, :relation_with_customer, :health, :death_age, :death_year, :death_reason, :_destroy],
      address_attributes: [:street_1, :street_2, :city, :state, :pincode, :address_type])
  end
end