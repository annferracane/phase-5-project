class LaborCategorySerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :jobs
  has_many :contractor_profiles
end
