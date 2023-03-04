class ProfileSerializer < ActiveModel::Serializer
  attributes :first_name, :last_name, :image

  def full_name
    self.object.first_name + " " + self.object.last_name
  end
end
