require 'test_helper'

class TheoremsControllerTest < ActionController::TestCase
  setup do
    @theorem = theorems(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:theorems)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create theorem" do
    assert_difference('Theorem.count') do
      post :create, theorem: { text: @theorem.text, user_id: @theorem.user_id }
    end

    assert_redirected_to theorem_path(assigns(:theorem))
  end

  test "should show theorem" do
    get :show, id: @theorem
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @theorem
    assert_response :success
  end

  test "should update theorem" do
    patch :update, id: @theorem, theorem: { text: @theorem.text, user_id: @theorem.user_id }
    assert_redirected_to theorem_path(assigns(:theorem))
  end

  test "should destroy theorem" do
    assert_difference('Theorem.count', -1) do
      delete :destroy, id: @theorem
    end

    assert_redirected_to theorems_path
  end
end
