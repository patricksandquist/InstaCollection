class SubmissionsController < ApplicationController
  def index
    @submissions = Submission.where("collection_id = ?", params[:collection_id].to_i)
    render json: @submissions
  end

  def create
    @submission = Submission.new(submission_params)

    if @submission.save
      render json: @submission
    else
      render json: @submission.errors, status: :unprocessable_entity
    end
  end

  private
    def submission_params
      params.require(:submission)
            .permit(:tag_time, :media_type, :link, :username, :image_path, :collection_id)
    end
end
