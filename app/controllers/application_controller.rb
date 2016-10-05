class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :sort_column, :sort_direction

  def after_sign_in_path_for(resource)
    agent_dashboard_path  
  end

  # Method for pagination in all list pages
  def paginated(resources, per_page = Settings.pagination.default, page = params[:page])
    if resources.present?
      resources.kind_of?(Array) ? Kaminari.paginate_array(resources).page(page).per(per_page) : resources.order("created_at DESC").page(page).per(per_page)
    end
  end

  def sort_by_options(resources)
    if params[:sort] == 'first_name'
      resources.order("first_name #{sort_direction}")
    else
      resources.order("#{sort_column(resources.first.class)} #{sort_direction}")
    end
  end

  def sort_and_paginate(resources)
    paginated(sort_by_options(resources))
  end

  def sort_column(resource, default_column = 'created_at')
    if resource.present? && resource != NilClass
      resource.column_names.include?(params[:sort]) ? params[:sort] : "#{resource.table_name}.#{default_column}"
    else
      default_column
    end
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
  end
end