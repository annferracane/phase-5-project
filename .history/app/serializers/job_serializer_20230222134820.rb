class JobSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :timeline, :is_accepted, :is_completed, :user_id
end
