class Objection < ActiveRecord::Base
  def counter_theorem
    Theorem.find(self.counter_theorem_id)
  end
end
