class MovesController < ApplicationController
  def create
    combination = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]
    @game = Game.find(params[:game_id])
    @move = Move.new(move_params)
    @move.game = @game
    @move.user = current_user
    !@move.valid? ? flash.now[:alert] = 'no!' : ()
    if @move.save
      GameChannel.broadcast_to(
        @game,
        render_to_string(partial: "move", locals: { move: @move })
      )
      if Move.all.size >= 4
        cu = []
        ncu = []

        Move.select(:move).where("game_id=#{@game.id} AND user_id=#{@move.user.id}").each {|move| cu << move.attributes.values[0].to_i}
        Move.select(:move).where("game_id=#{@game.id} AND user_id!=#{@move.user.id}").each {|move| ncu << move.attributes.values[0].to_i}

        combination.each do |x|
          if x.all? {|y| cu.include?(y)}
            puts "#{@move.user.nickname} wins"
            Move.delete_all
            redirect_to root_path, alert: "#{@move.user.nickname} wins"
          elsif x.all? {|y| ncu.include?(y)}
            id = Move.where("game_id=1 AND user_id!=#{@move.user.id}").first.user_id
            puts "#{User.find(id).nickname} wins"
            Move.delete_all
            redirect_to root_path, alert: "#{User.find(id).nickname} wins"
          elsif Move.all.size == 9
            puts "Tie!"
            Move.delete_all
            redirect_to root_path, alert: "Tie!"
          end
        end
      end
    end
  end

  private

  def move_params
    params.permit(:move)
  end
end
