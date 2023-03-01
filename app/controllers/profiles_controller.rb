class ProfilesController < ApplicationController
    def create
        profile = Profile.create!(profile_params)
        user = User.find(params[:user_id])
        render json: user, status: :created
    end
    
    def update
        user = User.find(params[:user_id])
        profile = user.profile
        profile.update!(profile_params)
        render json: user, status: :accepted
    end

    private

    def profile_params
        params.permit(:first_name, :last_name, :image, :user_id)
    end
end
