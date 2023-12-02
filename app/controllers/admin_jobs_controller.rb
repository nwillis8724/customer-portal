class AdminJobsController < ApplicationController
    before_action :set_admin_job, only: [:show, :update, :destroy]

  # GET /admin_jobs
  def index
    @admin_jobs = AdminJob.all
    render json: @admin_jobs
  end

  # GET /admin_jobs/1
  def show
    render json: @admin_job
  end

  # POST /admin_jobs
  def create
    @admin_job = AdminJob.new(job_params)

    if @job.save
      render json: @admin_job, status: :created, location: @admin_job
    else
      render json: @admin_job.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /admin_jobs/1
  def update
    if @admin_job.update(job_params)
      render json: @admin_job
    else
      render json: @admin_job.errors, status: :unprocessable_entity
    end
  end

  # DELETE /admin_jobs/1
  def destroy
    @admin_job.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_job
      @admin_job = AdminJob.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def admin_job_params
      params.require(:admin_job).permit(:admin, :job)
    end
end
