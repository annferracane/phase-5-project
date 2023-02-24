class ProfilesController < ApplicationController
    def create

    end
    
    def update

    end

    private

    def profile_params
        params.permit(:first_name, :last_name, :image, )
    end
end
