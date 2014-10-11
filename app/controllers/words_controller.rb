require 'csv'

class WordsController < ApplicationController
  def load
    respond_to do |format|
      data = {}
      CSV.foreach("db/translations/combined.csv") do |row|
        original = row.first
        translated = row.last
        data[original] = translated
      end
      format.json { render :json => { :data => data } }
    end
  end
end

# CSV.open("db/first.csv", "wb") do |csv|
#     output = row.join(" ").split(/\s+/m)
#     word = output.shift
#     output = output.join(" ")
#     if output.include?("f er s t")
#       csv << [word, output]
#     end
#   end
# end