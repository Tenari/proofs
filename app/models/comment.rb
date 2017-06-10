class Comment < ActiveRecord::Base
  belongs_to :object, polymorphic: true
  belongs_to :user

  validates :user_id, presence: true
  validates :text, presence: true, length: { in: 3..5000 }

  after_create do
    parent = self.object
    Notification.create(object_type: self.class.to_s, object_id: self.id, theorem_id: parent.id, user_id: parent.user.id, viewed: false)
  end

  def text_html
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, no_intra_emphasis: true, fenced_code_blocks: true, underline: true)
    return markdown.render(self.text)
  end
end
