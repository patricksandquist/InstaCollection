# == Schema Information
#
# Table name: submissions
#
#  id            :integer          not null, primary key
#  tag_time      :integer          not null
#  media_type    :text             not null
#  link          :text             not null
#  username      :string           not null
#  image_path    :text             not null
#  collection_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Submission < ActiveRecord::Base
  validates :tag_time, :media_type, :link, :username, :image_path, :collection_id, presence: true

  belongs_to :collection
end
