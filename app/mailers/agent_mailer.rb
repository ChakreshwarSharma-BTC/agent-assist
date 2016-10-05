class AgentMailer < ApplicationMailer
  
  def renewal_reminder(policy_renewal_date, current_user)
    binding.pry
    email = current_user.email
    mail(to: email, subject: 'renewal_reminder') do |format|
      format.html
    end       
  end 
end