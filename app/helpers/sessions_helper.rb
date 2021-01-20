module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !current_user.nil?
  end

  def log_out
    current_user = nil
    session[:user_id] = nil
  end

  def require_signin
    unless logged_in?
      render status: :unprocessable_entity, json: { errors: "You need to be Logged in first!"}
      # redirect_to new_session_url
    end
  end
end
