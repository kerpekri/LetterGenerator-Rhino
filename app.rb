require 'sinatra'
require 'haml'
require 'json'
require 'pry'

get '/' do
  haml :index
end

get '/load_template' do
  template = (@params[:type] == 'generate_letter') ? :load_letters : :load_numbers

  if (request.xhr?)
    haml template, :layout => false 
  else 
    redirect "/"
  end
end