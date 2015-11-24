class SubmissionsController < ApplicationController
  def index
    @submissions = Submission.where("collection_id = ?", params[:collection_id].to_i)
    render json: @submissions
  end

  def create
    @submission = Submission.new(collection_params)

    if @collection.save
      render json: @collection
    else
      render json: @collection.errors, status: :unprocessable_entity
    end
  end

  private
    def collection_params
      params.require(:submission)
            .permit(:tag_time, :type, :link, :username, :image_path, :collection_id)
    end
end
