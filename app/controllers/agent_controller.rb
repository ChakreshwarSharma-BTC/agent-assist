class AgentController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    no_of_policies = Policy.agent_policies(current_user).count
    no_of_customers = User.agent_customers(current_user).count
    no_of_companies = Company.company_count
    @premium_reminder =  paginated(Policy.weekly_premium_date) if Policy.present?
    @stats = { no_of_customers: no_of_customers, no_of_policies: no_of_policies, no_of_companies: no_of_companies }
  end
end