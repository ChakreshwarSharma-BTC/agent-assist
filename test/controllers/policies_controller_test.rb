require 'test_helper'

class PoliciesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get policies_index_url
    assert_response :success
  end

  test "should get new" do
    get policies_new_url
    assert_response :success
  end

  test "should get show" do
    get policies_show_url
    assert_response :success
  end

  test "should get edit" do
    get policies_edit_url
    assert_response :success
  end

end
