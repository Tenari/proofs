require 'test_helper'

class ArgumentsControllerTest < ActionController::TestCase
  setup do
    @argument = arguments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:arguments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create argument" do
    assert_difference('Argument.count') do
      post :create, argument: { theorem_id: @argument.theorem_id, title: @argument.title, user_id: @argument.user_id }
    end

    assert_redirected_to argument_path(assigns(:argument))
  end

  test "should show argument" do
    get :show, id: @argument
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @argument
    assert_response :success
  end

  test "should update argument" do
    patch :update, id: @argument, argument: { theorem_id: @argument.theorem_id, title: @argument.title, user_id: @argument.user_id }
    assert_redirected_to argument_path(assigns(:argument))
  end

  test "should destroy argument" do
    assert_difference('Argument.count', -1) do
      delete :destroy, id: @argument
    end

    assert_redirected_to arguments_path
  end
end
