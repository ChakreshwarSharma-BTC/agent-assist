class AgentController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    @policy_count = Policy.policy_count
    @customer_count = User.customers.count
    @company_count = Company.company_count
  end
end