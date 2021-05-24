class MoveController < ApplicationController
  def index
    @moves = Move.all
  end
end

