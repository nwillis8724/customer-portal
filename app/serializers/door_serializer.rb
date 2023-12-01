class DoorSerializer < ActiveModel::Serializer
  attributes :id, :model, :size, :color, :date_of_arrival, :job_id, :door_notes

  belongs_to :job
  # has_many :notes
end
