class PoliciesController < ApplicationController
  before_action :policies_params,only: [:create]
  def new
    @policies=Policy.new
  end

  def index
    @policies = Policy.all
  end

  def edit
  end

  def show
  end

  def create
    @policies= Policy.new(policies_params)
    if @policies.save
      @policies.address.user_id=@policies.user_id
      redirect_to  policies_path
    else
      redirect_to  new_policy_path
    end

  end


  private
  def policies_params
    params.require(:policy).permit(:mod_of_payment,:policy_number,:start_date,:end_date,:premium_mode,:premium_amount,:total_amount,:renewal_date,:last_renewed_on,:play_type,:total_year,:plan_id,:user_id,:city,:state,:pincode,:street_1,:street_2,
     personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender],
     vehicle_attributes: [:registration_number,:name,:ncb,:idv_accessory,:electrical_accessory,:non_electrical_accessory],
     address_attributes: [:city,:state,:pincode,:street_1,:street_2],
     life_insurance_attributes: [:policy_term,:education_qualification,:annual_income,:term_rider,:critical_illness,:with_aaccident_cover])
  end
end








































