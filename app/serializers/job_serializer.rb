class JobSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :timeline, :is_accepted, :is_completed, :user_id

  has_many :job_comments
  has_many :labor_categories
  # belongs_to :contractor_profile
  # belongs_to :property
end
