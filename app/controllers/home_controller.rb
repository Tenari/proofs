class HomeController < ApplicationController

  def index
    if current_user
      @notifications = current_user.notifications.order('id desc').limit(50).to_a.group_by{|n| n.object.object} # 50 most recent things
      puts @notifications
      return render 'myhome'
    end
  end

  def login_choices
  end
end
