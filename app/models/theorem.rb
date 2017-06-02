class Theorem < ActiveRecord::Base
  MAX_LENGTH = 200
  validates :text, length: {maximum: MAX_LENGTH}
  validates :user_id, presence: true
  has_many :arguments
  has_many :objections
  has_many :comments, as: :object
  belongs_to :user

  def tree_symbol
    self.is_an_objection? ? "!" : "-"
  end

  def tree_name
    self.text
  end

  def countered_theorems
    Objection.where(counter_theorem_id: self.id)
  end

  def is_an_objection?
    self.countered_theorems.count > 0
  end

  def first_objected_theorem
    self.countered_theorems.first.try(&:theorem)
  end

  def updated!
    self.updated_at = Time.now
    self.save
  end

  def viewed!
    self.update_column(:views, self.views + 1)
  end

  def supported?
    return self.source || self.arguments.count > 0
  end

  def expandable?
    return self.objections.count > 0 || self.arguments.count > 0
  end

  def parent
    at = ArgumentsTheorem.where(theorem_id: self.id).first
    return nil unless at
    argument = Argument.find(at.argument_id)
    return argument.theorem
  end

  def to_h
    {
      id: self.id,
      text: self.text,
      class_name: self.class.to_s,
      arguments_count: self.arguments.count,
      objections_count: self.objections.count,
      comments_count: self.comments.count,
      source: self.source,
      user_id: self.user_id,
      views: self.views,
      user: self.user,
    }
  end

  def as_json(options={})
    super.merge(self.to_h.merge({
      arguments: self.arguments.limit(5).map {|a| a.as_json }
    }))
  end
end
