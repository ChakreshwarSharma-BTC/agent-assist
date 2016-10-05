class AgentMailer < ApplicationMailer
  
  def renewal_reminder(policy_renewal_date,user)
    email = user.email
    mail(to: email, subject: 'renewal_reminder') do |format|
      format.html
    end     
  end 

  def update_policy(policy, current_user)
    email = current_user.email
    mail(to: email, subject: 'renewal_reminder') do |format|
      format.html
    end  
  end
end