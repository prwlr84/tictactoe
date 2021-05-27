class GamesController < ApplicationController
  def show
    Move.delete_all
    gon.user = current_user.nickname
    @game = Game.find(params[:id])
    @move = Move.new
  end
end
