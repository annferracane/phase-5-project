class User < ApplicationRecord
    has_one :profile
    has_one :contractor_profile
    has_many :properties
    has_many :jobs
    
end
