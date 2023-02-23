class User < ApplicationRecord
    has_one :profile
    has_one :contractor_profile
end
