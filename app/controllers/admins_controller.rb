class AdminsController < ApplicationController
  # before_action :set_admin, only: [:update, :destroy]

  # GET /admins
  def index
    @admins = Admin.all

    render json: @admins
  end

  # GET /admins/1
  def me
    if session[:user_id].present?
      user = Admin.find_by(id: session[:user_id])
      if user
        render json: user
      else
        user_not_found
      end
    end
  end

  def show
    admin = Admin.find(params[:id])
    render json: admin
  end

  # POST /admins
  def create
    @admin = Admin.create(admin_params)

    if @admin.save
      render json: @admin
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /admins/1
  def update
    if session[:user_id]
      user = Admin.find_by(id: session[:user_id])
      if user
        if user.update(user_params)
          render json: user
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        user_not_found
      end
    end
  end

  # DELETE /admins/1
  def destroy
    user = Admin.find(params[:id])
    user.destroy
    head :no_content
  end

  private

    # Only allow a list of trusted parameters through.
    def admin_params
      params.require(:admin).permit(:username, :password, :password_confirmation, :position, :email, :image_url)
    end
end
