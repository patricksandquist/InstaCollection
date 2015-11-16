# == Schema Information
#
# Table name: submissions
#
#  id            :integer          not null, primary key
#  tag_time      :integer          not null
#  type          :text             not null
#  link          :text             not null
#  username      :string           not null
#  image_path    :text             not null
#  collection_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class SubmissionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
