class JobCommentsController < ApplicationController

    def index

    end

    def create

    end

    def destroy

    end

    private

    def job_comment_params
        params.permit()
    end
end