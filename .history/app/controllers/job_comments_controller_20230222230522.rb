class JobCommentsController < ApplicationController

    def index
        job_comments = Job

    end

    def create
        job_comment = JobComment.create!(job_comment_params)
        render json: job_comment, status: :created
    end

    def destroy

    end

    private

    def job_comment_params
        params.permit(:job_id, :comment)
    end
end
