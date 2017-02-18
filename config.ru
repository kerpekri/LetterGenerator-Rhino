require 'rubygems'
require 'bundler'
require 'raven'
Bundler.require

require './app.rb'
run Sinatra::Application

Raven.configure do |config|
  config.dsn = 'https://5bd6a4eb089f42d19c9207d1efbb68de:d501a8c0f8d649bb8b0e49bc9586342a@sentry.io/140395'
end

use Raven::Rack