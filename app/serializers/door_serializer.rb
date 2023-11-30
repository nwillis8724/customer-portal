class DoorSerializer < ActiveModel::Serializer
  attributes :id, :model, :size, :color, :date_of_arrival, :job_id
end
