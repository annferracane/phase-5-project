class PropertySerializer < ActiveModel::Serializer
  attributes :id, :street_address_1, :street_address_2, :city, :state, :zip, :country, :property_category, :user_id, :street_address, :city_state, :user_profile_image
  
  has_many :jobs
  belongs_to :user
  

  def street_address
    if self.object.street_address_2 && self.object.street_address_2 != ''
      self.object.street_address_1 + ', ' + self.object.street_address_2
    else
      self.object.street_address_1
    end
  end

  def city_state
    self.object.city + ', ' + self.object.state
  end

  def user_profile_image
    if self.object.user.profile
      self.object.user.profile.image
    else
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3y6KF3tG1JFKYb5-pdMgdaHrfd9jZ_Crkaw&usqp=CAU" # revisit
    end
  end

end
