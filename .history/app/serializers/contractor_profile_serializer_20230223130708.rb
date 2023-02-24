class ContractorProfileSerializer < ActiveModel::Serializer
  attributes :id, :zip, :travel_radius_miles, :user_id

  has_many :jobs
  has_many :labor_categories
end
