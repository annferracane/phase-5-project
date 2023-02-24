class JobLaborCategoriesController < ApplicationController
    def create(job_labor_category_params
        JobLaborCategory.create!(job_labor_category_params)
        labor_category = LaborCategory.find(params[:labor_category_id])
        render json: user, status: :created)

    end

    def destroy

    end

    private 

    def job_labor_category_params
        params.permit(:job_id, :labor_category_id)
    end
end
