class User < ApplicationRecord
    has_one :profile
    has_one :contractor_profile
    has_many :properties
    has_many :jobs
    has_many :comments, through: :jobs
    has_many :job_labor_categories, through: :jobs
end
