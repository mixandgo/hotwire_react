class RegistrationsController < Devise::RegistrationsController
  respond_to :turbo_stream

  def create
    @user = User.new(user_params)

    render :create_failed unless @user.save
  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
