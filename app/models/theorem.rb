class Theorem < ActiveRecord::Base
  validates :text, length: {maximum: 255}
  has_many :arguments
end
