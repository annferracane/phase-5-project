class LaborCategory < ApplicationRecord
    has_many :contractor_specialties
    has_many :contractor_profiles, through: :contractor_specialties
end
