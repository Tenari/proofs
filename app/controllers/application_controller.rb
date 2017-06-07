class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter do
    redirect_to '/' if current_user && current_user.handle.nil? && request.path != '/' && request.method == 'GET'
  end
end
