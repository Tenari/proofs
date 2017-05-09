# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170509123327) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "arguments", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.integer  "theorem_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.boolean  "ordered",    default: true
  end

  create_table "arguments_theorems", force: :cascade do |t|
    t.integer  "order"
    t.integer  "argument_id"
    t.integer  "theorem_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "object_id"
    t.string   "object_type"
    t.text     "text"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "objections", force: :cascade do |t|
    t.integer  "theorem_id"
    t.integer  "counter_theorem_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "tags", force: :cascade do |t|
    t.integer  "object_id"
    t.string   "object_type"
    t.string   "text"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "tags", ["object_id", "object_type"], name: "index_tags_on_object_id_and_object_type", using: :btree
  add_index "tags", ["text"], name: "index_tags_on_text", using: :btree

  create_table "theorems", force: :cascade do |t|
    t.string   "text"
    t.integer  "user_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "source"
    t.boolean  "root",       default: false
    t.integer  "views",      default: 0
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",   default: "", null: false
    t.string   "uid",        default: "", null: false
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "users", ["uid"], name: "index_users_on_uid", unique: true, using: :btree

end
