get '/' do
  haml :'start_section/index'
end

get '/choose_letters_or_numbers' do
  template = (@params[:type] == 'load_letter_section') ? :'choose_section/picked_letters' : :'choose_section/picked_numbers'

  if (request.xhr?)
    haml template, :layout => false
  else 
    redirect "/"
  end
end