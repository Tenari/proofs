class CreateArgumentTheorems < ActiveRecord::Migration
  def change
    create_table :arguments_theorems do |t|
      t.integer :order
      t.integer :argument_id
      t.integer :theorem_id

      t.timestamps null: false
    end
  end
end
