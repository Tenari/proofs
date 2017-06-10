# a notification is *for* user_id. it represents the time that this user needs to see that some other object was created.
# for instance, a comment on a user's theorem results in a notification to the user, indicating that he needs to read the comment.
# the theorem_id is for the parent theorem to which the comment/object that spawned this notification belongs
class Notification < ActiveRecord::Base
  belongs_to :object, polymorphic: true
  belongs_to :theorem
  belongs_to :user

  def viewed!
    self.update_attribute(:viewed, true)
  end
end
