class SessionsController < ApplicationController
  def new
    render
  end

  def create
    puts  "ENTERED"
    @user = User.find_by(email: params[:user][:email])
    if @user && @user.authenticate(params[:user][:password])
      log_in @user
      @current_user = current_user
      render status: :ok, json: { notice: "logged in successfully", current_user: @current_user}
    else
      puts "entered error"
      render status: :unprocessable_entity, json: {errors: ["Invalid email / password combination"]}
    end
  end

  def destroy
    log_out
    render status: :ok, json: { notice: "successfully logged out"}
  end

end
