class Player < ActiveRecord::Base
  attr_accessible :email, :fb_id, :gender, :location, :name

  validates_uniqueness_of :fb_id
end
