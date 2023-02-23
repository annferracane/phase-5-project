class Property < ApplicationRecord
    belongs_to :user
    has_many :jobs
    has_many :contractor_profiles, through: :jobs
end
