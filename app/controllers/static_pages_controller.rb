class StaticPagesController < ApplicationController
  def root
    '<a href="/oauth/connect">Connect with Instagram</a>'
  end
end
