class JobsController < ApplicationController
    skip_before_action :authorized_user, only: [:sample_job_index, :show]

    def index
        if params[:property_id]
            jobs = Property.find(params[:property_id]).jobs.order(created_at: :asc)
        elsif params[:contractor_profile_id]
            jobs = ContractorProfile.find(params[:contractor_profile_id]).jobs.order(created_at: :asc)
        elsif params[:user_id]
            jobs = User.find(params[:user_id]).jobs.order(created_at: :asc)
        else
            jobs = Job.where(is_accepted: false, is_completed: false).order(created_at: :desc).limit(30)
        end
        render json: jobs, status: :ok
    end

    def sample_job_index
        jobs = Job.where(is_accepted: false, is_completed: false).order(created_at: :desc).limit(10)
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
        job = Job.find(params[:id])
        job.update!(job_params)
        render json: job, status: :accepted
    end

    def destroy
        job = Job.find(params[:id])
        job.destroy
        head :no_content
    end
    
    private

    def job_params
        params.permit(:title, :description, :timeline, :is_accepted, :is_completed, :property_id, :contractor_profile_id)
    end
end
