class DoorsController < ApplicationController
  before_action :set_door, only: [:show, :update, :destroy]

  # GET /doors
  def index
    @doors = Door.all

    render json: @doors
  end

  # GET /doors/1
  def show
    render json: @door
  end

  # POST /doors
  def create
    @door = Door.new(door_params)
  
    if @door.save
      render json: @door, status: :created, location: @door
    else
      render json: { errors: @door.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /doors/1
  def update
    if @door.update(door_params)
      render json: @door
    else
      render json: @door.errors, status: :unprocessable_entity
    end
  end

  # DELETE /doors/1
  def destroy
    @door.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_door
      @door = Door.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def door_params
      params.require(:door).permit(:model, :size, :color, :date_of_arrival, :job_id)
    end
end
