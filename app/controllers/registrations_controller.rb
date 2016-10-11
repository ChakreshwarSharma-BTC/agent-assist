class RegistrationsController < Devise::RegistrationsController

  def new
    @user = User.new
  end

  def create
    build_resource(sign_up_params)
     if resource.save
      yield resource if block_given?
      resource.active_for_authentication?
      set_flash_message! :notice, :signed_up
      sign_up(resource_name, resource)
      respond_with resource, location: after_sign_up_path_for(resource)
    else
      redirect_to new_user_registration_path
      flash[:error] = @user.errors.full_messages.to_sentence
    end
  end
  private
  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :is_active, :primary_phone_no, 
      personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender])
  end
end 