class ViewWebController < ApplicationController
  before_action :set_cart, :set_category
  def home
    @products = Product.joins("INNER JOIN ranks ON product_id = products.id").limit(12).order("star_level desc")
  end

  def about
  end

  def contacts
  end

  def product
  end

  def collections
  end

  def login
  end

  def account
  end

  def cart
  end

  private
    def set_cart
      @carts = Cart.where(user_id: current_user.id)
    end

    def set_category
      @categories = Category.all.limit(3)
    end
end
