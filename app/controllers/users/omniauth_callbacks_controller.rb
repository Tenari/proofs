class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])
    sign_in @user, :event => :authentication #this will throw if @user is not activated
    redirect_to (request.env['omniauth.origin'] || '/')
  end
end
