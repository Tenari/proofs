module TheoremsHelper

  def build_path(object)
    theorem_path(@theorem) + "?" + {path: (@path + ["#{object.class.to_s}:#{object.id}"]).join("/")}.to_query
  end
end
