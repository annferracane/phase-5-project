class JobsController < ApplicationController
    def index
        

    end

    def create
        job = Job.create!(job_params)
        render json: job, status: :created)
    end

    def show

    end

    def update

    end

    def destroy

    end
    
    private

    def job_params
        params.permit(:title, :description, :timeline, :is_accepted, :is_completed, :property_id, :contractor_profile_id)
    end
end
