class ContractorProfilesController < ApplicationController

    def create
        Contr

    end

    def update

    end

    private

    def contractor_profile_params
        params.permit(:zip, :travel_radius_miles, :user_id)
    end

end
