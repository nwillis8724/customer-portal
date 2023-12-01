class Job < ApplicationRecord
    has_many :doors
    has_many :notes
    has_many :admin_jobs
    has_many :admins, through: :admin_jobs

    def job_notes
      notes.where(door_id: nil)
    end

  end