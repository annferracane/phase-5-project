class ContractorSpecialtySerializer < ActiveModel::Serializer
  attributes :id, :contractor_profile_id, :labor_category_id
  belongs_to :contractor_profile
  belongs_to :
end
