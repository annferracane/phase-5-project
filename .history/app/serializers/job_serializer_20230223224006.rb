class JobSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :timeline, :is_accepted, :is_completed, :property_id, :contractor_profile_id

  has_many :comments
  has_many :labor_categories
  belongs_to :contractor_profile
  belongs_to :property
end
