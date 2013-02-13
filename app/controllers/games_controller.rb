class GamesController < ApplicationController
  # GET /games
  # GET /games.json
  def index
    @games = Game.all
    if params.has_key?(:player_id)
      @games = Game.order("created_at DESC").joins(:game_participants).where("game_participants.player_id" => params[:player_id])
    end

    respond_to do |format|
      format.html # index.html.erb
      #format.json { render json: @games.to_json({:include => [
      #    :game_participants => { :only => [:status], :methods => [:player_name]}
      #    ]
      #  })
      #}

      format.json { render json: @games.as_json({:methods => [:opponents]}) }
    end
  end

  # GET /games/1
  # GET /games/1.json
  def show
    @game = Game.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @game }
    end
  end

  # GET /games/new
  # GET /games/new.json
  def new
    @game = Game.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @game }
    end
  end

  # GET /games/1/edit
  def edit
    @game = Game.find(params[:id])
  end

  # POST /games
  # POST /games.json
  def create
    @game = Game.new(params[:game])

    respond_to do |format|
      if @game.save
        format.html { redirect_to @game, notice: 'Game was successfully created.' }
        format.json { render json: @game, status: :created, location: @game }
      else
        format.html { render action: "new" }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /games/1
  # PUT /games/1.json
  def update
    @game = Game.find(params[:id])

    respond_to do |format|
      if @game.update_attributes(params[:game])
        format.html { redirect_to @game, notice: 'Game was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1
  # DELETE /games/1.json
  def destroy
    @game = Game.find(params[:id])
    @game.destroy

    respond_to do |format|
      format.html { redirect_to games_url }
      format.json { head :no_content }
    end
  end

  def add_participants
    @game = Game.find(params[:id])

    if !params[:participants].nil? && !params[:participants].empty?
      params[:participants].each do |p|
        is_current = p[1] == session[:current_player].fb_id
        player = Player.find_by_fb_id(p[1])
        @game.game_participants.build(:player_id => player.id, :status => is_current ? "Accepted" : "Pending")
        @game.save!
      end
    end

    respond_to do |format|
      format.html { redirect_to games_url }
      format.json { head :no_content }
    end
  end

  def handle_invitation
    game = Game.find(params[:id])
    participant = GameParticipant.find_by_game_id_and_player_id(params[:id], params[:player_id])

    participant.status = params[:status]
    participant.save!

    accepted_participants = game.game_participants.reject do |p|
      p.status != "Accepted"
    end

    if accepted_participants.length == game.game_participants.length
      game.status = "In Progress"
      game.save!
    end

    respond_to do |format|
      format.html { redirect_to games_url }
      format.json { render json: game }
    end
  end
end
