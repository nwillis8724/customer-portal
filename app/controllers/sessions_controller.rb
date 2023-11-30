class SessionsController < ApplicationController
  def create
    user = Admin.find_by(username: params[:username])

    if user.nil?
      render json: { error: "Invalid Username" }, status: :unauthorized
    elsif user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { error: "Invalid Password" }, status: :unauthorized
    end
  end
      
      def destroy
        session.delete(:user_id)
        head :no_content
      end
end
