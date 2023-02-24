class JobsController < ApplicationController
    def index
        if params[:property_id]
            jobs = Property.find(params[:property_id]).jobs
        elsif params[:contractor_profile_id]
            jobs = ContractorProfile.find(params[:contractor_profile_id]).jobs
        else
            jobs = Job.all
        end
        render json: jobs, status: :ok
    end

    def create
        job = Job.create!(job_params)
        render json: job, status: :created
    end

    def show
        if params[:property_id]
            job = Property.find(params[:property_id]).jobs.find(params[:id])
        elsif params[:contractor_profile_id]
            job = ContractorProfile.find(params[:contractor_profile_id]).jobs.find(params[:id])
        else
            job = Job.find(params[:id])
        end
        render json: job, status: :ok
    end

    def update
        job = Job.update!(job_params)
        render json: job, status: :accepted
    end

    def destroy

    end
    
    private

    def job_params
        params.permit(:title, :description, :timeline, :is_accepted, :is_completed, :property_id, :contractor_profile_id)
    end
end
