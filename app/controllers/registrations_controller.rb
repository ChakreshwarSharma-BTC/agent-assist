class RegistrationsController < Devise::RegistrationsController

  private
  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :is_active, :primary_phone_no, 
      personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender])
  end
end 