class GameChannel < ApplicationCable::Channel
  def subscribed
    game = Game.find(params[:id])
    stream_for game
    stream_from game
  end

  def unsubscribed

  end
end
