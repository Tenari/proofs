class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :object_type
      t.integer :object_id
      t.integer :user_id
      t.integer :theorem_id
      t.boolean :viewed, default: false

      t.timestamps null: false
    end
  end
end
