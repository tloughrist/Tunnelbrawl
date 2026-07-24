# Be sure to restart your server when you modify this file.
#
# Cross-Origin Resource Sharing (CORS) for the React frontend.
# The allowed origin is env-driven (FRONTEND_ORIGIN), defaulting to the local
# Vite dev server. `credentials: true` is required so the browser sends the
# session cookie on cross-origin requests.
#
# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch("FRONTEND_ORIGIN", "http://localhost:4000")

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
