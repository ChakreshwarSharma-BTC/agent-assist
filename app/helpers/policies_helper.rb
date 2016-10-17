module PoliciesHelper
  def start_date
    @policy.start_date.present? ? formatted_date(@policy.start_date) : ""
  end

  def end_date
    @policy.end_date.present? ? formatted_date(@policy.end_date) : ""
  end

  def policy_holder_birth_date
    @policy.personal_info.date_of_birth.present? ? formatted_date(@policy.personal_info.date_of_birth) : ""
  end

  def policy_reminder(policy)
    (policy.end_date < Settings.policy.day.days.from_now.beginning_of_day && action_name == 'policy_reminder') ? 'policy_color' : ''
  end
end