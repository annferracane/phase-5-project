class ProfilesController < ApplicationController
    def create(profile_params)
        profile = Profile.create!(profile_params)
        user = User.find(params[])
        render json: job, status: :created
    end
    
    def update

    end

    private

    def profile_params
        params.permit(:first_name, :last_name, :image, :user_id)
    end
end
