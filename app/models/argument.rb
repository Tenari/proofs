class Argument < ActiveRecord::Base
  has_many :arguments_theorems, dependent: :delete_all
  has_many :theorems, through: :arguments_theorems
  belongs_to :theorem
  belongs_to :user

  def as_json(options)
    super(methods: [], only: [:id, :title, :theorem_id, :user_id]).merge(theorems: self.theorems.map(&:to_h))
  end
end
