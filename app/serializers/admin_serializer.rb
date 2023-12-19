class AdminSerializer < ActiveModel::Serializer
  attributes :id, :username, :position, :created_at

  has_many :jobs
end
