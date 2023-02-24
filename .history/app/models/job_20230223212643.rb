class Job < ApplicationRecord
    belongs_to :contractor_profile, optional: true
    belongs_to :property
    has_many :comments, dependent: :destroy
    has_many :job_labor_categories, dependent: :destroy
    has_many :labor_categories, through: :job_labor_categories
end
