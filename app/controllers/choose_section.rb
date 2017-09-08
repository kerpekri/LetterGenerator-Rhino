get '/load_button' do
  if (request.xhr?)
    haml :'choose_section/load_button', :layout => false
  else 
    redirect "/"
  end
end

get '/load_generate_section' do
  if (request.xhr?)
    alphabet_type = @params[:alphabet_type]
    # move to Helper
    alphabet_list = 
      if alphabet_type == 'lv'
        'aābcčdeēfgģhiījkķlļmnņoprsštuūvzž'
      elsif alphabet_type == 'ru'
        'aбвгдеёжзийклмнопрстуфхцчшщъыьэюя'
      elsif alphabet_type == 'dk'
        'abcdefghijklmnopqrstuvwxyzæøå'
      else # custom
        'xyz'
      end
    alphabet_letter = alphabet_list.split('').sample

    haml :'generate_section/load_generate_section', :layout => false, 
      :locals => {:alphabet_letter => alphabet_letter}
  else 
    redirect "/"
  end
end