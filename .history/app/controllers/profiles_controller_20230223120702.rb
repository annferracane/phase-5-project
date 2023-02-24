class ProfilesController < ApplicationController
    def create(profile_params)

    end
    
    def update

    end

    private

    def profile_params
        params.permit(:first_name, :last_name, :image, :user_id)
    end
end
