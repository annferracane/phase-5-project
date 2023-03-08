class JobComment < ApplicationRecord
    belongs_to :job
    belongs_to :user

    validates :comment, presence: true, length: { minimum: 2 }
end
