class HomeController < ApplicationController

  def index
    if current_user
      return render 'myhome'
    end
  end

  def login_choices
  end
end
