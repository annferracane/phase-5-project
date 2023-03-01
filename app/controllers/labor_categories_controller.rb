class LaborCategoriesController < ApplicationController
    def index
        labor_categories = LaborCategory.all
        render json: labor_categories, status: :ok
    end

    def labor_category_lookup
        labor_category = LaborCategory.find_by!(name: params[:labor_category])
        render json: labor_category.id, status: :ok
    end
end
