class LaborCategoriesController < ApplicationController
    skip_before_action :authorized_user, only: [:index]

    def index
        labor_categories = LaborCategory.all
        render json: labor_categories, status: :ok
    end

    def delete_labor_categories
        job = Job.find(params[:job_id])
        job.labor_categories.destroy_all
        render json: job, status: :ok
    end

    def labor_category_lookup
        labor_category = LaborCategory.find_by!(name: params[:labor_category])
        render json: labor_category.id, status: :ok
    end
end
