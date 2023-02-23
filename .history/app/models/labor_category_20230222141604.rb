class LaborCategory < ApplicationRecord
    has_many :contractor_specialties
    has_many :contractors, through: :
end
