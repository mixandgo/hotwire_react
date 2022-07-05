class SiteController < ApplicationController
  def index
    @users = User.all
  end
end
