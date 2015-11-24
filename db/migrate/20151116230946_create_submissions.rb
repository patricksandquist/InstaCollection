class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.integer :tag_time, null: false
      t.text :media_type, null: false
      t.text :link, null: false
      t.string :username, null: false
      t.text :image_path, null: false
      t.integer :collection_id, null: false

      t.timestamps null: false
    end
  end
end
