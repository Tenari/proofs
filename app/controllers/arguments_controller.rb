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
  end

  # GET /arguments/1/edit
  def edit
  end

  # POST /arguments
  # POST /arguments.json
  def create
    @argument = Argument.new(argument_params)
    @argument.user = current_user
    return render json: {error: 'need at least one supporting theorem'} unless params[:theorems] && params[:theorems].count > 0

    if @argument.save
      params[:theorems].each do |string|
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
    respond_to do |format|
      if @argument.update(argument_params)
        format.html { redirect_to @argument, notice: 'Argument was successfully updated.' }
        format.json { render :show, status: :ok, location: @argument }
      else
        format.html { render :edit }
        format.json { render json: @argument.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /arguments/1
  # DELETE /arguments/1.json
  def destroy
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
      params.require(:argument).permit(:title, :user_id, :theorem_id)
    end
end
