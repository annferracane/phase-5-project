class JobLaborCategoriesController < ApplicationController
    def create

    end

    def destroy

    end

    private 

    def job_labor_category_params
        params.permit(:job_id, :labor_category_id)
    end
end
