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
  def option
    Category.all.map{ |c| [c.name, c.name]}
  end
  def page_class(lbl)
    if current_page?(controller: 'customers', action: 'new')
      content_tag(:label, lbl, class: "control-label col-md-3 align")
    else
      content_tag(:label, lbl, class: "control-label col-md-6 align")
    end
  end
end