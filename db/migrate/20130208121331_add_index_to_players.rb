class AddIndexToPlayers < ActiveRecord::Migration
  def change
    add_index :players, :fb_id, { :unique => true }
  end
end
