class TheoremsController < ApplicationController
  before_action :set_theorem, only: [:show, :edit, :update, :destroy]

  # GET /theorems
  # GET /theorems.json
  def index
    @theorems = Theorem.all
  end

  # GET /theorems/1
  # GET /theorems/1.json
  def show
  end

  # GET /theorems/new
  def new
    @theorem = Theorem.new
  end

  # GET /theorems/1/edit
  def edit
  end

  # POST /theorems
  # POST /theorems.json
  def create
    @theorem = Theorem.new(theorem_params)

    respond_to do |format|
      if @theorem.save
        format.html { redirect_to @theorem, notice: 'Theorem was successfully created.' }
        format.json { render :show, status: :created, location: @theorem }
      else
        format.html { render :new }
        format.json { render json: @theorem.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /theorems/1
  # PATCH/PUT /theorems/1.json
  def update
    if @theorem.update(theorem_params)
      render :show, status: :ok, location: @theorem
    else
      render json: @theorem.errors, status: :unprocessable_entity
    end
  end

  # DELETE /theorems/1
  # DELETE /theorems/1.json
  def destroy
    @theorem.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_theorem
      @theorem = Theorem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def theorem_params
      params.require(:theorem).permit(:text, :user_id, :source)
    end
end
