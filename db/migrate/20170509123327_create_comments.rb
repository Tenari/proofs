class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :object_id
      t.string :object_type
      t.text :text
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
