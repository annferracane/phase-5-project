class ContractorSpecialtiesController < ApplicationController

    def create

    end

    def destroy
        
    end

    private

    def contractor_specialty_params
        params.permit(:contractor_profile_id, )
    end

end
