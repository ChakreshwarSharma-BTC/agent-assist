class RegistrationsController < Devise::RegistrationsController
  def create
    build_resource(sign_up_params)
     if resource.save
      yield resource if block_given?
      resource.active_for_authentication?
      sign_up(resource_name, resource)
      respond_with resource, location: after_sign_up_path_for(resource)
    else
      render :new
      flash[:error] = @user.errors.full_messages.to_sentence
    end
  end

  def update
    if params[:user][:personal_info].present?
      personal_info = params[:user][:personal_info].permit!
      current_user.personal_info.update_attributes(personal_info)
    end
    super
  end

  private
  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :is_active, :primary_phone_no, 
      personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender])
  end
end 