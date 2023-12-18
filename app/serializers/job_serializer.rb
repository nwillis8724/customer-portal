class JobSerializer < ActiveModel::Serializer
  attributes :id, :address, :date_of_install, :access_code, :admin_id, :job_notes, :job_admin, :door_notes

  has_many :admins
  has_many :notes, serializer: NoteSerializer
  has_many :doors, serializer: DoorSerializer

  def job_admin
      object.admins
  end
  
end
