require 'test_helper'

class RanksControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get ranks_new_url
    assert_response :success
  end

end
