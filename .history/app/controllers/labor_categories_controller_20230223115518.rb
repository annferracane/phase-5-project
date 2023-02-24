class LaborCategoriesController < ApplicationController
    def index
        labor_categories = LaborCategory.all
        
    end
end
