class User < ApplicationRecord
    has_one :profile, dependent: :destroy
    has_one :contractor_profile, dependent: :destroy
    has_many :properties, dependent: :destroy
    has_many :jobs, through: :properties
end
