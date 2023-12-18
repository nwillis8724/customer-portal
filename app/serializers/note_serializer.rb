class NoteSerializer < ActiveModel::Serializer
  attributes :id, :note, :job_id, :door_id, :admin_id, :poster_name

  belongs_to :job
  belongs_to :door

  def poster_name
    object.poster_name if object.respond_to?(:poster_name)
  end
end
