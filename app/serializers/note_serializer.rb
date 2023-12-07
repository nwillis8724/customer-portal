class NoteSerializer < ActiveModel::Serializer
  attributes :id, :note, :job_id, :door_id, :admin_id, :admin_user

  belongs_to :job
  belongs_to :door

  def admin_user
    object.admin if object.admin.present?
  end
end
