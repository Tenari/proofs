class Theorem < ActiveRecord::Base
  validates :text, length: {maximum: 255}
  validates :user_id, presence: true
  has_many :arguments
  belongs_to :user

  def updated!
    self.updated_at = Time.now
    self.save
  end

  def to_h
    {
      id: self.id,
      text: self.text,
      arguments_count: self.arguments.count,
      source: self.source,
      user_id: self.user_id,
    }
  end

  def as_json(options)
    super(options)
  end
end
