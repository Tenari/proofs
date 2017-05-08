class AddViewsToTheorem < ActiveRecord::Migration
  def change
    add_column :theorems, :views, :integer, default: 0
  end
end
