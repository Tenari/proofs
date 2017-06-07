class UsersController < ApplicationController

  # GET /:handle
  # GET /:id
  def show
    begin
      @user = User.find(params[:handle_or_id])
    rescue ActiveRecord::RecordNotFound => e
      @user = User.find_by_handle(params[:handle_or_id])
    end
  end

  # PUT /:id
  # PATCH /:id
  def update
    @user = User.find(params[:id])
    @user.handle = params[:user][:handle]
    if @user.save
      redirect_to user_path(@user)
    else
      render 'home/myhome'
    end
  end

end
