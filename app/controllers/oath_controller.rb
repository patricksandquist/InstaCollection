class OathController < ApplicationController
  CALLBACK_URL = "http://insta-collection.herokuapp.com/oauth/callback"

  Instagram.configure do |config|
    config.client_id = "YOUR_CLIENT_ID"
    config.client_secret = "YOUR_CLIENT_SECRET"
    # For secured endpoints only
    #config.client_ips = '<Comma separated list of IPs>'
  end

  def create
    redirect Instagram.authorize_url(:redirect_uri => CALLBACK_URL)
  end

  def index
    response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
    session[:access_token] = response.access_token
    redirect "/collections"
  end
end
