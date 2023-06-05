# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_05_034357) do
  create_table "breaks", force: :cascade do |t|
    t.integer "work_day_id", null: false
    t.datetime "check_in_timestamp"
    t.datetime "check_out_timestamp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["work_day_id"], name: "index_breaks_on_work_day_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.string "password_digest"
  end

  create_table "work_days", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "check_in_timestamp"
    t.datetime "check_out_timestamp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_work_days_on_user_id"
  end

  add_foreign_key "breaks", "work_days"
  add_foreign_key "work_days", "users"
end
