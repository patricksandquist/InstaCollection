class SubmissionsController < ApplicationController
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
