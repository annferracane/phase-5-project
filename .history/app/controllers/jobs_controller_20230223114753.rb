class JobsController < ApplicationController
    def index
        if params[:property_id]
            tip = School.find(params[:school_id]).tips.find(params[:id])
        elsif params[:user_id]
            tip = User.find(params[:user_id]).tips.find(params[:id])
        else
            tip = Tip.find(params[:id])
        end
        render json: tip, status: :ok
    end

    def create
        job = Job.create!(job_params)
        render json: job, status: :created
    end

    def show

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
