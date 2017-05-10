class Comment < ActiveRecord::Base
  belongs_to :object, polymorphic: true
  belongs_to :user

  validates :user_id, presence: true
end
