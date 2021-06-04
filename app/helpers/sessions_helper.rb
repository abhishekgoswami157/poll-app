module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
  end

  def current_user
    @curren_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !current_user.nil?
  end

  def log_out
    session.delete(:user_id)
    current_user = nil
  end

  def require_signin
    unless logged_in?
      render status: :unprocessable_entity, json: { notice: "You need to be Logged in first!"}
    end
  end
end
