class ContractorProfile < ApplicationRecord
    belongs_to :user
    has_many :contractor_specialties
    has_many :labor_categories through: 
end
