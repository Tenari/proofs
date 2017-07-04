class User < ActiveRecord::Base
  devise :omniauthable, :omniauth_providers => [:facebook, :google_oauth2]
  has_many :arguments
  has_many :theorems
  has_many :notifications
  #validates :handle, :uniqueness => true, format: {with: /\A[a-zA-Z0-9]+\z/ , message: "may only contain numbers and letters"}

  validate do
    self.errors.add(:handle, "cannot use that handle") if self.handle == 'theorems'
    unless self.handle.nil?
      other_user = User.where(handle: self.handle).first
      self.errors.add(:handle, "handle already taken") if other_user

      self.errors.add(:handle, "handle may only use a-z A-Z and 0-9") unless self.handle =~ /\A[a-zA-Z0-9]+\z/
    end
  end

  def self.from_omniauth(auth)
    user = where(provider: auth.provider, uid: auth.uid).first_or_create
    user.name = auth.info.name
    user.email = auth.info.email
    user.save

    user
  end

  def as_json(options={})
    super(only: [:id, :name, :handle])
  end
end
