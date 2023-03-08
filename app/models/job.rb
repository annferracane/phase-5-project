class Job < ApplicationRecord
    belongs_to :contractor_profile, optional: true
    belongs_to :property
    has_many :job_comments, dependent: :destroy
    has_many :job_labor_categories, dependent: :destroy
    has_many :labor_categories, through: :job_labor_categories

    validates :title, presence: true
    validates :description, presence: true, length: { in: 10..500 }
    validates :timeline, presence: true

end
