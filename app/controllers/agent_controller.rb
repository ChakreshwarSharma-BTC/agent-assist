class AgentController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    @policy_count = Policy.count
    @customer_count = User.count
    @company_count = Company.count
  end
end