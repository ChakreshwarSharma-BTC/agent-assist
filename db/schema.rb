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

ActiveRecord::Schema.define(version: 20160926091415) do

  create_table "addresses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "employer_id"
    t.string   "street_1",     default: ""
    t.string   "street_2",     default: ""
    t.string   "city",         default: "", null: false
    t.string   "state",        default: "", null: false
    t.string   "pincode",      default: "", null: false
    t.integer  "address_type", default: 0,  null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["employer_id"], name: "index_addresses_on_employer_id", using: :btree
    t.index ["user_id"], name: "index_addresses_on_user_id", using: :btree
  end

  create_table "banks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "bank_name"
    t.integer  "cheque_no"
    t.date     "date"
    t.integer  "micr_code"
    t.string   "rfgs"
    t.integer  "account_no"
    t.string   "account_type"
    t.float    "amount",       limit: 24
    t.string   "branch"
    t.integer  "policy_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["bank_name"], name: "index_banks_on_bank_name", using: :btree
    t.index ["policy_id"], name: "index_banks_on_policy_id", using: :btree
  end

  create_table "categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", using: :btree
  end

  create_table "companies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_companies_on_name", using: :btree
  end

  create_table "company_categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "company_id"
    t.integer  "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["category_id"], name: "index_company_categories_on_category_id", using: :btree
    t.index ["company_id"], name: "index_company_categories_on_company_id", using: :btree
  end

  create_table "coverages", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.boolean  "pakage"
    t.boolean  "fire_only"
    t.boolean  "fire_with_liabillity"
    t.boolean  "theft_only"
    t.boolean  "theft_with_liability"
    t.boolean  "fire_and_theft_only"
    t.boolean  "fire_and_theft_with_liability"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "employers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name_of_office"
    t.integer  "how_long"
    t.integer  "plan_type"
    t.integer  "policy_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["name_of_office"], name: "index_employers_on_name_of_office", using: :btree
    t.index ["policy_id"], name: "index_employers_on_policy_id", using: :btree
  end

  create_table "families", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.string   "health",       default: "", null: false
    t.integer  "death_age",                 null: false
    t.date     "death_year",                null: false
    t.string   "death_reason", default: "", null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["user_id"], name: "index_families_on_user_id", using: :btree
  end

  create_table "life_insurances", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "policy_term"
    t.string   "education_qualification"
    t.float    "annual_income",           limit: 24
    t.boolean  "term_rider"
    t.boolean  "critical_illness"
    t.boolean  "with_aaccident_cover"
    t.integer  "family_id"
    t.integer  "policy_id"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.index ["annual_income"], name: "index_life_insurances_on_annual_income", using: :btree
    t.index ["family_id"], name: "index_life_insurances_on_family_id", using: :btree
    t.index ["policy_id"], name: "index_life_insurances_on_policy_id", using: :btree
    t.index ["policy_term"], name: "index_life_insurances_on_policy_term", using: :btree
  end

  create_table "medical_histories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "height"
    t.string   "weight"
    t.string   "abd"
    t.string   "chest"
    t.string   "identification_mark"
    t.date     "date"
    t.string   "operation_detail"
    t.integer  "policy_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.index ["policy_id"], name: "index_medical_histories_on_policy_id", using: :btree
  end

  create_table "nominees", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "relation"
    t.integer  "policy_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["policy_id"], name: "index_nominees_on_policy_id", using: :btree
  end

  create_table "personal_infos", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "informable_type"
    t.integer  "informable_id"
    t.string   "first_name",      default: "", null: false
    t.string   "middle_name",     default: "", null: false
    t.string   "last_name",       default: "", null: false
    t.date     "date_of_birth"
    t.integer  "gender",          default: 0,  null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["date_of_birth"], name: "index_personal_infos_on_date_of_birth", using: :btree
    t.index ["first_name"], name: "index_personal_infos_on_first_name", using: :btree
    t.index ["informable_type", "informable_id"], name: "index_personal_infos_on_informable_type_and_informable_id", using: :btree
    t.index ["last_name"], name: "index_personal_infos_on_last_name", using: :btree
    t.index ["middle_name"], name: "index_personal_infos_on_middle_name", using: :btree
  end

  create_table "plans", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "company_categories_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["company_categories_id"], name: "index_plans_on_company_categories_id", using: :btree
    t.index ["name"], name: "index_plans_on_name", using: :btree
  end

  create_table "policies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "mod_of_payment"
    t.string   "policy_number"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "premium_mod"
    t.float    "premium_amount",  limit: 24
    t.float    "total_amount",    limit: 24
    t.date     "renewal_date"
    t.date     "last_renewed_on"
    t.integer  "play_type"
    t.integer  "total_year"
    t.integer  "plan_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["end_date"], name: "index_policies_on_end_date", using: :btree
    t.index ["plan_id"], name: "index_policies_on_plan_id", using: :btree
    t.index ["policy_number"], name: "index_policies_on_policy_number", using: :btree
    t.index ["renewal_date"], name: "index_policies_on_renewal_date", using: :btree
    t.index ["start_date"], name: "index_policies_on_start_date", using: :btree
  end

  create_table "roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "resource_type"
    t.integer  "resource_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
    t.index ["name"], name: "index_roles_on_name", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.boolean  "is_active",              default: false, null: false
    t.string   "primary_phone_no",       default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "users_roles", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "user_id"
    t.integer "role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree
  end

  create_table "vehicle_coverages", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "vehicle_id"
    t.integer "coverage_id"
    t.index ["coverage_id"], name: "index_vehicle_coverages_on_coverage_id", using: :btree
    t.index ["vehicle_id"], name: "index_vehicle_coverages_on_vehicle_id", using: :btree
  end

  create_table "vehicles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "registration_number"
    t.string   "name"
    t.string   "ncb"
    t.boolean  "idv_accessory"
    t.boolean  "electrical_accessory"
    t.boolean  "non_electrical_accessory"
    t.integer  "policy_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["name"], name: "index_vehicles_on_name", using: :btree
    t.index ["policy_id"], name: "index_vehicles_on_policy_id", using: :btree
  end

  add_foreign_key "banks", "policies"
  add_foreign_key "company_categories", "categories"
  add_foreign_key "company_categories", "companies"
  add_foreign_key "employers", "policies"
  add_foreign_key "life_insurances", "families"
  add_foreign_key "life_insurances", "policies"
  add_foreign_key "medical_histories", "policies"
  add_foreign_key "nominees", "policies"
  add_foreign_key "plans", "company_categories", column: "company_categories_id"
  add_foreign_key "policies", "plans"
  add_foreign_key "vehicle_coverages", "coverages"
  add_foreign_key "vehicle_coverages", "vehicles"
  add_foreign_key "vehicles", "policies"
end
