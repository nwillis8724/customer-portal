class Admin < ApplicationRecord
  has_secure_password

  has_many :admin_jobs
  has_many :jobs, through: :admin_jobs

  validates :position, presence: true
  validates :username, presence: true
  validate :password_complexity

  private

  def password_complexity
    if password.present? && !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*.])/)
      errors.add :password, 'must include at least one uppercase letter, one lowercase letter, and one symbol'
    end
  end
end