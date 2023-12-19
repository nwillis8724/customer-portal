class JobSerializer < ActiveModel::Serializer
  attributes :id, :address, :date_of_install, :access_code, :admin_id, :notes

  has_many :doors
end
