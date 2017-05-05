class AddRootToTheorem < ActiveRecord::Migration
  def change
    add_column :theorems, :root, :boolean, default: false
  end
end
