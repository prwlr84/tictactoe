class PagesController < ApplicationController

  def home
    gon.user = current_user.email
    gon.games = Game.all.order(:id)
  end
end
