class ProfilesController < ApplicationController
    def create(profile_params)
        profile = Profile.create!(profile_params)
        user = User.find(params[:user_id])
        render json: user, status: :created
    end
    
    def update(profile_params)
        user = User.find(params[:user_id])
        contractor_profile = user.contractor_profile
        contractor_profile.update!(contractor_profile_params)
        render json: user, status: :accepted
    end

    private

    def profile_params
        params.permit(:first_name, :last_name, :image, :user_id)
    end
end
