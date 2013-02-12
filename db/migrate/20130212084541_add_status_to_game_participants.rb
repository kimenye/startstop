class AddStatusToGameParticipants < ActiveRecord::Migration
  def change
    add_column :game_participants, :status, :string
  end
end
