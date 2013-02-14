class Game < ActiveRecord::Base
  attr_accessible :status, :game_participants

  has_many :game_participants,:dependent => :delete_all

  def opponents
    opponents = self.game_participants.map do |p|
      p.player_fb_id
    end
    opponents.join(",")
  end

  def versus
    opponents = self.game_participants.map do |p|
      p.player_name
    end
    opponents.join(",")
  end

  def status_text
    if self.status == "pending"
      "Waiting for your opponent"
    end
  end
end

class GameParticipant < ActiveRecord::Base
  attr_accessible :status, :player_id, :game_id

  belongs_to :game
  belongs_to :player

  def player_fb_id
    self.player.fb_id
  end

  def player_name
     self.player.name
  end
end
