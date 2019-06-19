class RanksController < ApplicationController
  before_action :set_cart, :set_category, :load_rated_product, only: :create

  def create
    rank = current_user.ranks.new rating_params
    respond_to do |format|
      format.html{redirect_to @product}
      format.js
    end if rank.save
  end

  private

    def rating_params
      params.require(:rank).permit :product_id, :star_level
    end

    def load_rated_product
      return @product = Product.find_by(id: rating_params[:product_id])
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
