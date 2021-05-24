class PagesController < ApplicationController

  def home
    gon.user = current_user.email
  end
end
