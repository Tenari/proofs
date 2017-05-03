class CreateArguments < ActiveRecord::Migration
  def change
    create_table :arguments do |t|
      t.string :title
      t.integer :user_id
      t.integer :theorem_id

      t.timestamps null: false
    end
  end
end
