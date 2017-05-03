class AddSourceToTheorem < ActiveRecord::Migration
  def change
    add_column :theorems, :source, :string
  end
end
