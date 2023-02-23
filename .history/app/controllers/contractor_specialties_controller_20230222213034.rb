class ContractorSpecialtiesController < ApplicationController

    def create
        ContractorSpecialty.create!()

    end

    def destroy
        
    end

    private

    def contractor_specialty_params
        params.permit(:contractor_profile_id, :labor_category_id)
    end

end
