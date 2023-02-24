class JobsController < ApplicationController
    def index

    end

    def create
        job = Job.create!(job_params)
        render json: job, status: :created
    end

    def show
        if params[:property_id]
            job = Property.find(params[:property_id]).tips.find(params[:id])
        elsif params[:contractor_profile_id]
            tip = User.find(params[:user_id]).tips.find(params[:id])
        else
            tip = Tip.find(params[:id])
        end
        render json: tip, status: :ok
    end

    def update

    end

    def destroy

    end
    
    private

    def job_params
        params.permit(:title, :description, :timeline, :is_accepted, :is_completed, :property_id, :contractor_profile_id)
    end
end
