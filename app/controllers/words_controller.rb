class WordsController < ApplicationController
  def load
    respond_to do |format|
      file = File.open("#{Rails.root}/db/beep")
      # binding.pry
      format.json { render :json => { :data => data } }
    end
  end
end