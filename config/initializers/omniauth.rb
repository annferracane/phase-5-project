Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'],
    {
      provider_ignores_state: true
    }
  end

OmniAuth.config.allowed_request_methods = %i[get]

# config/initializers/omniauth.rb
OmniAuth.config.full_host = Rails.env.production? ? 'https://jindah-app.onrender.com' : 'http://localhost:4000'