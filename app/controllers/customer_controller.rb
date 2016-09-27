class CustomerController < ApplicationController
  before_action :set_user, only: [:new, :new_family_member]

  def new
  end

  def create
    customer = User.new(customer_params)
    customer.password = Settings.user.password
    if customer.save!
      redirect_to agent_dashboard_path
    end
  end

  def new_family_member
    @family_member = @customer
    respond_to do |format|
      format.js
    end
  end

  private
  def customer_params
    params.require(:user).permit(:email, :password, :password_confirmation, :is_active, :primary_phone_no, 
      personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender],
      family_attributes: [ { personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender]}, :health, :death_age, :death_year, :death_reason],
      address_attributes: [:street_1, :street_2, :city, :state, :pincode, :address_type])
  end

  def set_user
    @customer = User.new
  end
end