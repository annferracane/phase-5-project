class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest

  has_one :profile
  has_one :contractor_profile
end
