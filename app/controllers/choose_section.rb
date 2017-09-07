get '/load_button' do
  if (request.xhr?)
    haml :'choose_section/load_button', :layout => false
  else 
    redirect "/"
  end
end

get '/load_generate_section' do
  if @params[:type] == 'lv'
    alphabet_list = ''
  elsif @params[:type] == 'ru'
    alphabet_list = ''
  elsif @params[:type] == 'dk'
    alphabet_list = ''
  else
    alphabet_list = ''
  end

  if (request.xhr?)
    haml :'generate_section/load_generate_section', :layout => false
  else 
    redirect "/"
  end
end