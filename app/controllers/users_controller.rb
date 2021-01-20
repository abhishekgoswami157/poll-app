class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      @current_user = current_user
      render status: :ok, json: { notice: 'Account created successfully!', current_user: @current_user }
    else
      render status: :unprocessable_entity, json: { errors: @user.errors.full_messages.to_sentence}
    end
  end

  def show
    @current_user = current_user
    render status: :ok, json: { current_user: @current_user}
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
