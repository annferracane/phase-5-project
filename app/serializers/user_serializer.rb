class UserSerializer < ActiveModel::Serializer
  attributes :id, :email

  has_one :profile
  has_one :contractor_profile
  has_many :properties
  has_many :jobs
  has_many :job_comments

  def user_profile
    self.object.profile
  end
end
