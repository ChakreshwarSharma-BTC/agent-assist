module ApplicationHelper
  DEFAULT_SELECT_OPTION = "--- Select ---"
	def void_link
    JAVASCRIPT_VOID
  end
  
  def formatted_date(date)
    I18n.l(date, format: I18n.t('date.formats.short'))
  end
end
