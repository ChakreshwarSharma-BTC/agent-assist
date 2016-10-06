class PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
    else
      flash[:error] = 'Entered email id is not registered.'
      redirect_to new_user_password_path
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    super
    user = resource_class.with_reset_password_token(params[:reset_password_token])
    if user.blank? || !user.reset_password_period_valid?
      flash[:error] = 'Password link is expired. Please reset password again.'
    end
  end

  # PUT /resource/password
  # def update
  #   super
  # end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end