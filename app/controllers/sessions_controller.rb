class SessionsController < ApplicationController
  def new
    render
  end

  def create
    puts  "ENTERED"
    @user = User.find_by(email: params[:user][:email])
    puts @user.email, "USER"
    if @user && @user.authenticate(params[:user][:password])
      log_in @user
      render status: :ok, json: { notice: "logged in successfully"}
    else
      render status: :unprocessable_entity, json: {errors: ["Invalid email / password combination"]}
    end
  end

  def destroy
    log_out
    render status: :ok, json: { notice: "successfully logged out"}
  end

end
