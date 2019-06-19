class Rank < ApplicationRecord
  belongs_to :user
  belongs_to :product
  validates :user_id, presence: true
  validates :product_id, presence: true
  validates :star_level, inclusion: {in: 0..5}
end
