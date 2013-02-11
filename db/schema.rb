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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130211172527) do

  create_table "game_participants", :id => false, :force => true do |t|
    t.integer "game_id"
    t.integer "player_id"
  end

  add_index "game_participants", ["game_id", "player_id"], :name => "index_game_participants_on_game_id_and_player_id"
  add_index "game_participants", ["player_id", "game_id"], :name => "index_game_participants_on_player_id_and_game_id"

  create_table "games", :force => true do |t|
    t.string   "status"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "players", :force => true do |t|
    t.string   "fb_id"
    t.string   "name"
    t.string   "location"
    t.string   "gender"
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "players", ["fb_id"], :name => "index_players_on_fb_id", :unique => true

end
