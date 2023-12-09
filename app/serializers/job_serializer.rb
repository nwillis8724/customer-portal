class JobSerializer < ActiveModel::Serializer
  attributes :id, :address, :date_of_install, :access_code, :admin_id, :job_notes, :job_admin

  has_many :admins
  has_many :notes
  has_many :doors

  def job_admin
      object.admins
  end
end
rails 