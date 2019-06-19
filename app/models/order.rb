class Order < ApplicationRecord
  belongs_to :user
  belongs_to :cart
  enum status: { put: 0, wait: 1, approved: 2, sent: 3 }
end
