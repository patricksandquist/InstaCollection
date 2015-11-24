class CollectionsController < ApplicationController
  before_action :set_collection, only: [:show]

  def index
    @collections = Collection.all
  end

  # GET /collections/1
  # GET /collections/1.json
  def show
  end

  # GET /collections/new
  def new
    @collection = Collection.new
  end

  # POST /collections
  # POST /collections.json
  def create
    @collection = Collection.new(collection_params)

    if @collection.save
      render json: @collection
    else
      render json: @collection.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_collection
      @collection = Collection.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def collection_params
      params.require(:collection).permit(:hashtag, :start_date, :end_date)
    end
end
