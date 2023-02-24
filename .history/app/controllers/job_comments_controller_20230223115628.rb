class JobCommentsController < ApplicationController
    def index
        job_comments = Job.find_by(params[:job_id])
        render json: job_comments, status: :ok
    end

    def create
        job_comment = JobComment.create!(job_comment_params)
        render json: job_comment, status: :created
    end

    def destroy
        job_comment = JobComment.find(params[:id])
        job_comment.destroy
        head :no_content
    end

    private

    def job_comment_params
        params.permit(:job_id, :comment)
    end
end
