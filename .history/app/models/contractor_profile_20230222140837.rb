class ContractorProfile < ApplicationRecord
    belongs_to :user
    has_many :jobs
    has_many :properties, through: :jobs
    has_many :contractor_specialties
    has_many :labor_categories, through: :contractor_specialties
end
