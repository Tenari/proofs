class CreateTheorems < ActiveRecord::Migration
  def change
    create_table :theorems do |t|
      t.string :text
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
