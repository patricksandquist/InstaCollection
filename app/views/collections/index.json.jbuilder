json.array!(@collections) do |collection|
  json.extract! collection, :id, :hashtag, :start_date, :end_date
  json.url collection_url(collection, format: :json)
end
