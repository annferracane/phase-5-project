class ContractorProfilesController < ApplicationController

    def create
        ContractorProfile.create!(contractor_profile_params)
        user = User.find(params[:user_id])
        render json: user, status: :created
    end

    def update
        user = User.find(params[:user_id])
        contractor_profile = user.contractor_profile
        contractor_profile.update!(contractor_profile_params)
        render

    end

    private

    def contractor_profile_params
        params.permit(:zip, :travel_radius_miles, :user_id)
    end

end
