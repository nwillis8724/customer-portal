class AdminSerializer < ActiveModel::Serializer
  attributes :id, :username, :position, :created_at, :image_url, :email

  has_many :notes
  has_many :jobs
end
