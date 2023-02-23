class LaborCategory < ApplicationRecord
    has_many :contractor_specialties, dependent: :destroy
    has_many :contractor_profiles, through: :contractor_specialties
end
