class InformationController < ApplicationController
  def add_to_count
    respond_to do |format|
      Information.last.add_to_count(params[:num_to_add])
      format.json { render :json => { :message => "Added: #{params[:num_to_add]} words!" } }
    end
  end
end