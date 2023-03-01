class PropertySerializer < ActiveModel::Serializer
  attributes :id, :street_address_1, :street_address_2, :city, :state, :zip, :country, :property_category, :user_id, :street_address, :city_state
  
  has_many :jobs

  def street_address
    if self.object.street_address_2
      self.object.street_address_1 + ', ' + self.object.street_address_2
    else
      self.object.street_address_1
    end
  end

  def city_state
    self.object.city + ', ' + self.object.state
  end

end
