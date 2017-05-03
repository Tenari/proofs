class CreateObjections < ActiveRecord::Migration
  def change
    create_table :objections do |t|
      t.integer :theorem_id
      t.integer :counter_theorem_id

      t.timestamps null: false
    end
  end
end
