class PropertySerializer < ActiveModel::Serializer
  attributes :id, :street_address_1, :street_address_2, :city, :state, :zip, :country, :property_category
  
  has_many :jobs
end
