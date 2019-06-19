class UsersController < ApplicationController
  before_action :set_cart, :set_category
  def show
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = t("welcome")
      redirect_to root_url
    else
      render :new
    end
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :phone, :address,
       :password, :password_confirmation)
    end

    def set_cart
      @carts = Cart.where(user_id: current_user.id)
    end

    def set_category
      @categories = Category.all.limit(3)
    end
end
