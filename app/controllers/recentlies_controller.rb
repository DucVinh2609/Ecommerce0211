class RecentliesController < ApplicationController
  before_action :set_cart, :set_category, :load_viewed_product, only: :create

  def create
    recently = current_user.recentlies.new recently_params
    respond_to do |format|
      format.html{redirect_to @product}
      format.js
    end if recently.save
  end
  private

    def recently_params
      params.require(:recently).permit(:product_id)
    end

    def load_viewed_product
      return @product = Product.find_by(id: recently_params[:product_id])
      flash[:danger] = t "product_not_found"
      redirect_to product_path
    end

    def set_cart
      @carts = Cart.where(user_id: current_user.id)
    end

    def set_category
      @categories = Category.all.limit(3)
    end
end
