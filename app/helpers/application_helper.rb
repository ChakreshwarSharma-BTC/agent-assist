module ApplicationHelper
  DEFAULT_SELECT_OPTION = "--- Select ---"
	def void_link
    JAVASCRIPT_VOID
  end
  
  def formatted_date(date)
    I18n.l(date, format: I18n.t('date.formats.short'))
  end

  def bootstrap_class(flash_type)
    case flash_type
    when "success"
      "alert-success"
    when "error"
      "alert-danger"
    when "alert"
      "alert-warning"
    when "notice"
      "alert-info"
    else
      flash_type.to_s
    end
  end

  def field_class(field)
    current_page?(controller: 'registrations', action: 'new') ||  current_page?(controller: 'registrations', action: 'create') ? content_tag(:div, field, class: 'col-md-7') : content_tag(:div, field, class: 'col-md-6') 
  end

  def resource_sortable(resource_class:,  resources_path:, column: , title: nil, no_link: false)
    if no_link
      title
    else
      title ||= column.titleize
      css_class = column == sort_column(resource_class) ? "fa fa-sort-#{sort_direction} active" : "fa fa-sort-desc"
      direction = column == sort_column(resource_class) && sort_direction == "asc" ? "desc" : "asc"
      link_to "#{title} #{content_tag(:i, '', class: css_class)}".html_safe,
        send(resources_path, params.merge(sort: column, direction: direction, q: params[:q]).permit!), remote: true
    end
  end
end