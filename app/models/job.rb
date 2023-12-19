class Job < ApplicationRecord
    has_many :doors
    has_many :notes
    has_many :admin_jobs
    has_many :admins, through: :admin_jobs

    validates :address, :date_of_install, :access_code, presence: true
    validates :date_of_install, format: { with: /\A\d{2}\/\d{2}\/\d{4}\z/, message: "should be in the format xx/xx/xxxx" }
  end