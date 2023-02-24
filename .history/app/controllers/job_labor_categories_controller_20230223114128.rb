class JobLaborCategoriesController < ApplicationController
    def create(job_labor_category_params
        JobLaborCategory.create!(contractor_profile_params)
        user = User.find(params[:user_id])
        render json: user, status: :created)

    end

    def destroy

    end

    private 

    def job_labor_category_params
        params.permit(:job_id, :labor_category_id)
    end
end
