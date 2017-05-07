class MarkTheoremsAsRoot < ActiveRecord::Migration
  def change
    Theorem.find_each do |t|
      if t.arguments.count > 0
        t.update_column(:root, true)
      end
    end
  end
end
