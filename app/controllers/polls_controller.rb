class PollsController < ApplicationController
  before_action :require_signin, except: [:index]
  def index
    @polls = Poll.all
    render status: :ok, json: { polls: @polls }
  end

  def new
  end

  def create
    params[:poll][:user_id] = current_user.id
    @poll = Poll.new(poll_params)
    if @poll.save
      render status: :ok, json: { notice: "Poll successfully created!", poll: @poll }
    else
      render status: :unprocessable_entity, json: { errors: @poll.errors.full_messages }
    end
  end

  def show
    @poll = Poll.find(params[:id])
    @options = @poll.options
    render status: :ok, json: { poll: @poll, options: @options}
  end

    private
    
    def poll_params
      params.required(:poll).permit(:title, :user_id, options_attributes: [:name])
    end

  
end
