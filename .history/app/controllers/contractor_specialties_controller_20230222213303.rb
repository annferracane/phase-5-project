class ContractorSpecialtiesController < ApplicationController

    def create
        ContractorSpecialty.create!(contractor_specialty_params)
        labor_category = LaborCategory.find(params[:labor_category_id])
        render json: labor_category, status: :created
    end

    def destroy
        
        
    end

    private

    def contractor_specialty_params
        params.permit(:contractor_profile_id, :labor_category_id)
    end

end
