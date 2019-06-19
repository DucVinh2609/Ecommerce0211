class SmallCategory < ApplicationRecord
  belongs_to :category
  validates :small_category_name, presence: true
end
