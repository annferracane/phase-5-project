class LaborCategory < ApplicationRecord
    has_many :contractor_specialties
    has_many :contractors, through: :contractor_specialties
end
