class PropertySerializer < ActiveModel::Serializer
  attributes :id, :street_address_1, :street_address_2, :city, :state, :zip, :lat, :lng, :country, :property_category, :user_id, :street_address, :city_state, :user_profile_image, :jobs_available
  
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
      ""
    end
  end

  def jobs_available
    if self.object.jobs
      self.object.jobs.where(is_accepted: false, is_completed: false).size
    else
      0
    end
  end

end
