class JobCommentsController < ApplicationController

    def index

    end

    def create
        JobComment.create!(job_comment_params)

    end

    def destroy

    end

    private

    def job_comment_params
        params.permit(:job_id, :comment)
    end
end
