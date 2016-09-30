module ApplicationHelper
  DEFAULT_SELECT_OPTION = "--- Select ---"
	def void_link
    JAVASCRIPT_VOID
  end
#flash type
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
end