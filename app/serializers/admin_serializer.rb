class AdminSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :position, :created_at
end
