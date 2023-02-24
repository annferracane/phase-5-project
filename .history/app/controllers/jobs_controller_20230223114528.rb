class JobsController < ApplicationController
    def index
        

    end

    def create
        Job.create!(job_params)
        labor_category = LaborCategory.find(params[:labor_category_id])
        render json: labor_category, status: :created)
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
