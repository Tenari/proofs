class Objection < ActiveRecord::Base
  belongs_to :theorem
  def counter_theorem
    Theorem.find(self.counter_theorem_id)
  end
end
