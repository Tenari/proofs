class User < ActiveRecord::Base
  devise :omniauthable, :omniauth_providers => [:facebook]
  has_many :arguments
  has_many :theorems

  def self.from_omniauth(auth)
    user = where(provider: auth.provider, uid: auth.uid).first_or_create
    user.name = auth.info.name
    user.email = auth.info.email
    user.save

    user
  end

  def as_json(options={})
    super(only: [:id, :name])
  end
end
