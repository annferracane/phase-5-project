class ContractorProfile < ApplicationRecord
    belongs_to :user
    has_many :contractor_special
end
