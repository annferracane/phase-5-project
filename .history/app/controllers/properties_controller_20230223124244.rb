class PropertiesController < ApplicationController
    def index

    end

    def show

    end

    def create(property_params)

    end

    def update

    end

    private

    def property_params
        params.permit(:street_address_1, :street_address_2, :city, :state, :zip, :country, :property_category, :user_id)
    end
end
