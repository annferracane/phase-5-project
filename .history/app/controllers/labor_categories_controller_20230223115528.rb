class LaborCategoriesController < ApplicationController
    def index
        labor_categories = LaborCategory.all
        render json: labor_categories, status: :ok
    end
end
