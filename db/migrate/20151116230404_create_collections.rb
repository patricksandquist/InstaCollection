class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.text :hashtag, null: false
      t.integer :start_date, null: false
      t.integer :end_date, null: false

      t.timestamps null: false
    end
  end
end
