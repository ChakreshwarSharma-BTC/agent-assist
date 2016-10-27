class AgentController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    total_policies = Policy.policy_count
    total_customers = User.where(created_by: current_user).count
    total_companies = Company.company_count
    @stats = { total_customers: total_customers, total_policies: total_policies, total_companies: total_companies }
  end
end