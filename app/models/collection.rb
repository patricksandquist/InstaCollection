# == Schema Information
#
# Table name: collections
#
#  id         :integer          not null, primary key
#  hashtag    :text             not null
#  start_date :integer          not null
#  end_date   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Collection < ActiveRecord::Base
  validates :hashtag, :start_date, :end_date, presence: true

  has_many :submissions
end
