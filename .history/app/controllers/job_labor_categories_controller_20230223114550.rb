class JobLaborCategoriesController < ApplicationController
    def create(job_labor_category_params
        JobLaborCategory.create!(job_labor_category_params)
        labor_category = LaborCategory.find(params[:labor_category_id])
        render json: labor_category, status: :created
    end

    def destroy
        job_labor_category = JobLaborCategory.find(params[:id])
        job_labor_category.destroy
        head :no_content
    end

    private 

    def job_labor_category_params
        params.permit(:job_id, :labor_category_id)
    end
end
