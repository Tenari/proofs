class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :object_id
      t.string :object_type
      t.string :text

      t.timestamps null: false
    end
    add_index(:tags, [:object_id, :object_type])
    add_index(:tags, :text)
  end
end
