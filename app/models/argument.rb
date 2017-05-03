class Argument < ActiveRecord::Base
  has_many :arguments_theorems
  has_many :theorems, through: :arguments_theorems
  belongs_to :theorem

  def as_json(options)
    super(methods: [], only: [:id, :title, :theorem_id]).merge(theorems: self.theorems.map{|t| {id: t.id, text: t.text, arguments_count: t.arguments.count, source: t.source}})
  end
end
