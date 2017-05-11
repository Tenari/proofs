class Comment < ActiveRecord::Base
  belongs_to :object, polymorphic: true
  belongs_to :user

  validates :user_id, presence: true
  validates :text, presence: true, length: { in: 3..5000 }

  def text_array
    self.text.split("\n")
  end
end
