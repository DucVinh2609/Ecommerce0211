module SessionsHelper
  # Logs in the given user.
  def log_in user
    session[:user_id] = user.id
  end

  # Returns the current logged-in user (if any).
  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    current_user.present?
  end

  def log_out
    session.delete:user_id
    @current_user = nil
  end

  def current_rating
    if current_user.rated? @product
      current_user.ranks.find_by product_id: @product.id
    else
      current_user.ranks.build
    end
  end

  def current_recently
    if current_user.viewed? @product
      current_user.recentlies.find_by product_id: @product.id
    else
      current_user.recentlies.build
    end
  end
end
