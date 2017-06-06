# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
