class CartsController < ApplicationController
  before_action :set_cart, :set_category, only: [:index]
  skip_before_action only: [:index]

  def index
  end

  def create
    @cart = Cart.new(cart_params)
    if @cart.save
      flash[:success] = "Add to Cart"
      redirect_to root_url
    end
  end


  def destroy
    @cart = Cart.find(params[:id])
    if @cart.present?
      @cart.destroy
      flash[:success] = t "destroy_cart"
    end
    redirect_to root_url
  end

  def update
  end

  private
    def set_cart
      @carts = Cart.where(user_id: current_user.id)
    end

    def cart_params
    params.permit(:quanitily, :product_id, :user_id)
    end

    def set_category
      @categories = Category.all.limit(3)
    end
end
