class CreateMoves < ActiveRecord::Migration[6.1]
  def change
    create_table :moves do |t|
      t.integer :user_id
      t.integer :field

      t.timestamps
    end
  end
end
