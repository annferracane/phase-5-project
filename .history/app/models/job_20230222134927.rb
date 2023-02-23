class Job < ApplicationRecord
    belongs_to :user
    has_many :comments
    has_many :job_labor_categories
    has_many through: :job_labor_categories
end
