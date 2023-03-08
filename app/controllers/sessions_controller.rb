class SessionsController < ApplicationController
    skip_before_action :authorized_user, only: [:create, :omniauth]
    
    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        else 
            render json:{errors: "Invalid password or username"}, status: :unauthorized
        end
    end
    
    def destroy
        session.delete :user_id
        head :no_content, status: :ok 
    end 

    def omniauth
        puts "reaching omniauth"
        user = User.find_or_create_by(uid: request.env['omniauth.auth'][:uid], provider: request.env['omniauth.auth'][:provider])
        user.email = request.env['omniauth.auth'][:info][:email]
        user.password = SecureRandom.hex(15)
        if user.save
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: {errors: "Invalid login"}, status: :unauthorized
        end
    end
end