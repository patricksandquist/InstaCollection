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

require 'test_helper'

class CollectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
