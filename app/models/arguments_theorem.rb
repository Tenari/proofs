class ArgumentsTheorem < ActiveRecord::Base
  belongs_to :theorem
  belongs_to :argument
  before_create do
    unless self.order
      self.order = self.argument.theorems.count
    end
  end
end
