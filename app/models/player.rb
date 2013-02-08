class Player < ActiveRecord::Base
  attr_accessible :email, :fb_id, :gender, :location, :name
end
