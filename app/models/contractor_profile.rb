class ContractorProfile < ApplicationRecord
    belongs_to :user
    has_many :jobs
    has_many :properties, through: :jobs
    has_many :contractor_specialties, dependent: :destroy
    has_many :labor_categories, through: :contractor_specialties

    validates :zip, presence: true, numericality: { only_integer: true }, length: { is: 5 }
    validates :travel_radius_miles, presence: true
end
