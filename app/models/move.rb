class Move < ApplicationRecord
  belongs_to :game

  validates :tile, uniqueness: true, presence: true
  validates :field, uniqueness: true, presence: true
end
