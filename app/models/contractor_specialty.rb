class ContractorSpecialty < ApplicationRecord
    belongs_to :contractor_profile
    belongs_to :labor_category
end
