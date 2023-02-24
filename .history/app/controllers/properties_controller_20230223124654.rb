class PropertiesController < ApplicationController
    def index

    end

    def show

    end

    def create(property_params)
        Property.create!(contractor_profile_params)
        user = User.find(params[:user_id])
        render json: user, status: :created
    end

    def update(property_params)

    end

    private

    def property_params
        params.permit(:street_address_1, :street_address_2, :city, :state, :zip, :country, :property_category, :user_id)
    end
end
