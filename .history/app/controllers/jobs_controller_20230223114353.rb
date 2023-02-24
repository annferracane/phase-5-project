class JobsController < ApplicationController
    def index

    end

    def create

    end

    def show

    end

    def update

    end

    def destroy

    end
    
    private

    def job_params
        params.permit(:title, :description, :timeline, :is_accepted, :is_completed, )
    end
end
