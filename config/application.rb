require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module AgentAssist
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.assets.raise_runtime_errors = true
    config.action_mailer.perform_deliveries = true
    config.action_mailer.raise_delivery_errors = true
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.default_options = { from: Settings.mailer.from }
    config.action_mailer.default_url_options = { :host => Settings.mailer.host }
    config.action_mailer.smtp_settings = {
      :address => "smtp.gmail.com",
      :port => 587,
      :domain => Settings.mailer.domain,
      :user_name => Settings.mailer.username,
      :password => Settings.mailer.password,
      :authentication => "plain",
      :enable_starttls_auto => true
    }
  end
end