class ArgumentsController < ApplicationController
  before_action :set_argument, only: [:show, :edit, :update, :destroy]

  # GET /arguments
  # GET /arguments.json
  def index
    @arguments = Argument.all
  end

  # GET /arguments/1
  # GET /arguments/1.json
  def show
  end

  # GET /arguments/new
  def new
    @argument = Argument.new
    authorize! :create, @argument
  end

  # GET /arguments/1/edit
  def edit
    authorize! :update, @argument
  end

  # POST /arguments
  # POST /arguments.json
  def create
    @argument = Argument.new(argument_params)
    authorize! :create, @argument
    @argument.user = current_user
    params[:theorems] ||= []
    theorems = params[:theorems].compact.reject{|t| t.blank?}
    return render json: {error: 'need at least one supporting theorem'} unless theorems.count > 0

    if @argument.save
      theorems.each do |string|
        @argument.theorems.create(text: string, user: current_user)
      end
      @argument.theorem.updated! # mark the originating theorem as updated, b/c someone added a new argument to it
      render :show, status: :created, location: @argument
    else
      render json: @argument.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /arguments/1
  # PATCH/PUT /arguments/1.json
  def update
    authorize! :update, @argument
    if @argument.update(argument_params)
      render json: @argument
    else
      render json: @argument.errors, status: :unprocessable_entity
    end
  end

  # DELETE /arguments/1
  # DELETE /arguments/1.json
  def destroy
    authorize! :destroy, @argument
    @argument.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_argument
      @argument = Argument.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def argument_params
      params.require(:argument).permit(:title, :user_id, :theorem_id, :ordered)
    end
end
