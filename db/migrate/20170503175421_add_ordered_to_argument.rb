class AddOrderedToArgument < ActiveRecord::Migration
  def change
    add_column :arguments, :ordered, :boolean, default: true
  end
end
