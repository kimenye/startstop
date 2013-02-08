class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :fb_id
      t.string :name
      t.string :location
      t.string :gender
      t.string :email

      t.timestamps
    end
  end
end
