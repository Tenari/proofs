class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])
    sign_in @user, :event => :authentication #this will throw if @user is not activated
    redirect_to (request.env['omniauth.origin'] || '/')
  end
  def google_oauth2
    puts "you are here"
    puts request.env["omniauth.auth"]
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])
    puts "user: #{@user.name}"
    sign_in @user, :event => :authentication #this will throw if @user is not activated
    puts "signed in"
    redirect_to (request.env['omniauth.origin'] || '/')
  end
end
