class JobSerializer < ActiveModel::Serializer
  attributes :id, :address, :date_of_install, :access_code, :admin_id, :job_notes

  belongs_to :admin
  has_many :notes
  has_many :doors
end
