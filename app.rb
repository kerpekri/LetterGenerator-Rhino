require 'sinatra'
require 'haml'
require 'json'
require 'pry'

configure do
  Dir["./app/models/*.rb"].each { |file| require file }
  Dir["./app/controllers/*.rb"].each { |file| require file }
  Dir["./app/helpers/*.rb"].each { |file| require file }
end

# start section -> choose section -> generate section