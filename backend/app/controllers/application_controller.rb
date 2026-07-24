class ApplicationController < ActionController::API

  include ActionController::Cookies

  # A bad/stale id should be a clean JSON 404, not an unhandled 500 (or a giant
  # HTML error page in development) that the SPA can't parse.
  rescue_from ActiveRecord::RecordNotFound do
    render json: { error: "Not found" }, status: :not_found
  end

end