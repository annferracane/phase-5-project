class User < ApplicationRecord
    has_one :profile, dependent: :destroy
    has_one :contractor_profile, dependent: :destroy
    has_many :properties, dependent: :destroy
    has_many :jobs, through: :properties
    has_many :comments, through: :jobs
    has_many :job_labor_categories, through: :jobs
end
