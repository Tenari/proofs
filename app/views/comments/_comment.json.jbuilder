json.extract! comment, :id, :object_id, :object_type, :text, :user_id, :created_at, :updated_at
json.user comment.user
json.text_array comment.text_html
