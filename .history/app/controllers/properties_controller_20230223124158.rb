class PropertiesController < ApplicationController
    def index

    end

    def show

    end

    def create

    end

    def update

    end

    private

    def property_params
        params.permit(:street_address_1, :street_address_2, :)
    end
end
