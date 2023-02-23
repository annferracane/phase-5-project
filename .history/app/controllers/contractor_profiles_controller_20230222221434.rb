class ContractorProfilesController < ApplicationController

    def create
        ContractorProfile.create!(contractor_profile_params)
        user = User.find(params[:user_id])
        
    end

    def update

    end

    private

    def contractor_profile_params
        params.permit(:zip, :travel_radius_miles, :user_id)
    end

end
