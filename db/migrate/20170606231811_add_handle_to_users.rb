class AddHandleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :handle, :string
    add_index :users, :handle, unique: true
  end
end
