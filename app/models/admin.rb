class Admin < ApplicationRecord
  has_secure_password
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'must be a valid email address' }
  validates :image_url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp, message: 'must be a valid URL' }

  has_many :admin_jobs
  has_many :jobs, through: :admin_jobs
  has_many :notes

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