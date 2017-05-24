class Argument < ActiveRecord::Base
  has_many :arguments_theorems, dependent: :delete_all
  has_many :theorems, through: :arguments_theorems
  belongs_to :theorem
  belongs_to :user

  def as_json(options)
    theorems = self.theorems.order('arguments_theorems.order asc').map(&:to_h)
    theorems.each_with_index do |t, i|
      t[:order] = i+1
    end
    super(methods: [], only: [:id, :title, :theorem_id, :user_id, :ordered]).merge(theorems: theorems)
  end
end
