class Move < ApplicationRecord
  belongs_to :game
  belongs_to :user

  validates :move, presence: true, uniqueness: { alert: "to me, it seems to be taken..." }
end
