class LaborCategoriesController < ApplicationController
    def index
        labor_categories = LaborCategory.all
        render json: 
    end
end
