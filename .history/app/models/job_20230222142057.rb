class Job < ApplicationRecord
    belongs_to :user
    belongs_to :contractor_profile
    belongs_to :property
    has_many :comments
    has_many :job_labor_categories
    has_many :labor_categories, through: :job_labor_categories
end
