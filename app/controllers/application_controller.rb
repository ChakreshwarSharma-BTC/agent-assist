class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :premium_reminder

  def after_sign_in_path_for(resource)
    resource.update_attributes(notification: false)
    agent_dashboard_path
  end

  # Method for pagination in all list pages
  def paginated(resources, per_page = Settings.pagination.default, page = params[:page])
    if resources.present?
      resources.kind_of?(Array) ? Kaminari.paginate_array(resources).page(page).per(per_page) : resources.order("created_at DESC").page(page).per(per_page)
    end
  end

  #Premium notification popup when use logged in
  def premium_reminder
    if Policy.present?
      @premium_reminder = []
      date_range = (Date.today...Settings.policy.day.days.from_now)
      Policy.all.each do |policy|
        @premium_reminder << policy if date_range.include?(policy.renewal_date)       
      end
    end
    @premium_reminder
  end
end