class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    agent_dashboard_path  
  end

  # Method for pagination in all list pages
  def paginated(resources, per_page = Settings.pagination.default, page = params[:page])
    if resources.present?
      resources.kind_of?(Array) ? Kaminari.paginate_array(resources).page(page).per(per_page) : resources.order("created_at DESC").page(page).per(per_page)
    end
  end
end