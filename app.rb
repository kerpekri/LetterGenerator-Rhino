require 'sinatra'
require 'haml'
require 'json'
require 'pry'

get '/' do
  haml :'home_section/index'
end

get '/choose_letters_or_numbers' do
  template = (@params[:type] == 'load_letter_section') ? :'choose_section/picked_letters' : :'choose_section/picked_numbers'

  if (request.xhr?)
    haml template, :layout => false 
  else 
    redirect "/"
  end
end

get '/load_button' do
  if (request.xhr?)
    haml :'choose_section/load_button', :layout => false 
  else 
    redirect "/"
  end
end

get '/load_generate_section' do
  if (request.xhr?)
    haml :'generate_section/load_generate_section', :layout => false 
  else 
    redirect "/"
  end
end