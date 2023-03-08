class PropertiesController < ApplicationController
    skip_before_action :authorized_user, only: [:index ]

    def index
        if params[:user_id]
            properties = User.find(params[:user_id]).properties
        else 
            properties = Property.order(created_at: :desc).limit(30)
        end
        render json: properties, status: :ok
    end

    def show
        property = Property.find(params[:id])
        render json: property, status: :ok
    end

    def create
        property = Property.create!(property_params)
        render json: property, status: :created
    end

    def update
        property = Property.find(params[:id])
        property.update!(property_params)
        render json: property, status: :accepted
    end

    def destroy
        property = Property.find(params[:id])
        property.destroy
        head :no_content
    end

    private

    def property_params
        params.permit(:street_address_1, :street_address_2, :city, :state, :zip, :lat, :lng, :country, :property_category, :user_id)
    end
end
