class Property < ApplicationRecord
    belongs_to :user
    has_many :jobs, dependent: :destroy
    has_many :contractor_profiles, through: :jobs

    validates :street_address_1, presence: true
    validates :city, presence: true
    validates :state, presence: true, length: { is: 2 }
    validates :zip, presence: true, numericality: { only_integer: true }, length: { is: 5 }
    validates :property_category, presence: true, inclusion: ["Residential", "Commercial"]
end
