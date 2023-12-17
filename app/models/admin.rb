class Admin < ApplicationRecord
  has_secure_password

  has_many :admin_jobs
  has_many :jobs, through: :admin_jobs

  validates :position, presence: true
  validates :username, presence: true
end