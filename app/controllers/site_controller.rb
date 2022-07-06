class SiteController < ApplicationController
  def index
    @users = User.order(created_at: :desc).all
  end
end
