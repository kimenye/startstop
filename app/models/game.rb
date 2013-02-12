class Game < ActiveRecord::Base
  attr_accessible :status

  has_many :game_participants,:dependent => :delete_all
end

class GameParticipant < ActiveRecord::Base
  attr_accessible :status, :player_id, :game_id

  belongs_to :game
  belongs_to :player
end
