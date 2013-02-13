class CreateGameParticipants < ActiveRecord::Migration
  def up
    create_table :game_participants do |t|
      t.column :game_id, :integer
      t.column :player_id, :integer
    end

    add_index :game_participants, [:player_id, :game_id]
    add_index :game_participants, [:game_id, :player_id]
  end

  def down
    drop_table :game_participants
  end
end
