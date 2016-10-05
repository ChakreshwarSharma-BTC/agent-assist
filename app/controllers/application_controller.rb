class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :policies

  def after_sign_in_path_for(resource)
    agent_dashboard_path  
  end

  # Method for pagination in all list pages
  def paginated(resources, per_page = Settings.pagination.default, page = params[:page])
    if resources.present?
      resources.kind_of?(Array) ? Kaminari.paginate_array(resources).page(page).per(per_page) : resources.order("created_at DESC").page(page).per(per_page)
    end
  end

  def policies
    @policy_renewal_date = Policy.policy_renewal
    @policy_renewal_date.each do |i|
      Agent.renewal_reminder(i,current_user).deliver.now 
    end
  end
end