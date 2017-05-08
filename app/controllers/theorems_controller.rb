class TheoremsController < ApplicationController
  before_action :set_theorem, only: [:show, :objections, :edit, :update, :destroy]

  # GET /theorems
  # GET /theorems.json
  def index
    @query = params[:query] || {
      search: '',
      filters: {mine: true},
    }
    @theorems = Theorem.all.where(root: true).limit(50)
    if current_user
      @theorems = @theorems.where(user_id: current_user.id) if @query[:filters][:mine]
      @theorems = @theorems.order('updated_at desc')
    else
      @theorems = @theorems.order('views desc')
    end
    @theorems = @theorems.where('text ILIKE ?', "#{@query[:search]}%") if @query[:search] && @query[:search].length > 0
    respond_to do |f|
      f.html { render 'index' }
      f.json { render json: @theorems }
    end
#    if params[:scope]
#      if params[:scope] == 'user' && current_user
#        @theorems = Theorem.where(user: current_user).order('updated_at desc')
#      end
#    end
  end

  # GET /theorems/1
  # GET /theorems/1.json
  def show
    @theorem.viewed!
  end

  def objections
  end

  # GET /theorems/new
  def new
    @theorem = Theorem.new
    authorize! :create, @theorem
    @objection = Theorem.find(params[:objection_id]) if params[:objection_id]
  end

  # GET /theorems/1/edit
  def edit
    authorize! :update, @theorem
  end

  # POST /theorems
  # POST /theorems.json
  def create
    @theorem = Theorem.new(theorem_params)
    @theorem.user = current_user
    authorize! :create, @theorem

    respond_to do |format|
      if @theorem.save
        if params[:objection_id]
          Objection.create(theorem_id: params[:objection_id], counter_theorem_id: @theorem.id)
        end
        if params[:argument_id]
          ArgumentsTheorem.create(argument_id: params[:argument_id], theorem_id: @theorem.id)
        end
        format.html { redirect_to @theorem, notice: 'Theorem was successfully created.' }
        format.json { render json: @theorem.to_h }
      else
        format.html { render :new }
        format.json { render json: @theorem.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /theorems/1
  # PATCH/PUT /theorems/1.json
  def update
    authorize! :update, @theorem
    if @theorem.update(theorem_params)
      render json: @theorem, status: :ok, location: @theorem
    else
      render json: @theorem.errors, status: :unprocessable_entity
    end
  end

  # DELETE /theorems/1
  # DELETE /theorems/1.json
  def destroy
    if params[:argument_id]
      authorize! :update, Argument.find(params[:argument_id])
      at = ArgumentsTheorem.where(argument_id: params[:argument_id], theorem_id: @theorem.id)
      at.delete_all
      head :no_content
    else
      authorize! :destroy, @theorem
      @theorem.destroy
      head :no_content
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_theorem
      @theorem = Theorem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def theorem_params
      params.require(:theorem).permit(:text, :user_id, :source, :root)
    end
end
