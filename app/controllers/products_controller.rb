class ProductsController < ApplicationController
  before_action :set_cart, :set_category, :set_product, :set_smallcategory, only: [:show]
  skip_before_action only: [:show]

  def show
  end

  private
    def set_product
      @product = Product.find(params[:id])
    end

    def set_smallcategory
      id_small = Product.find(params[:id]).small_category_id
      @small_category = SmallCategory.find(id_small)
    end

    def set_cart
      @carts = Cart.where(user_id: current_user.id)
    end

    def set_category
      @categories = Category.all.limit(3)
    end
end
