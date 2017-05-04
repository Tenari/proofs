class Theorem < ActiveRecord::Base
  validates :text, length: {maximum: 255}
  validates :user_id, presence: true
  has_many :arguments
  has_many :objections
  belongs_to :user

  def countered_theorems
    Objection.where(counter_theorem_id: self.id)
  end

  def updated!
    self.updated_at = Time.now
    self.save
  end

  def supported?
    return self.source || self.arguments.count > 0
  end

  def to_h
    {
      id: self.id,
      text: self.text,
      arguments_count: self.arguments.count,
      source: self.source,
      user_id: self.user_id,
      objections_count: self.objections.count,
    }
  end

  def as_json(options)
    super(options)
  end
end
