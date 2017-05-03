class DeviseCreateUsers < ActiveRecord::Migration
  def change
    create_table(:users) do |t|
      t.string :provider, null: false, default: ""
      t.string :uid, null: false, default: ""
      t.string :name
      t.string :email

      t.timestamps null: false
    end

    add_index :users, :uid, unique: true
  end
end
