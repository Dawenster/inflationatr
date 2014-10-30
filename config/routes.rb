Rails.application.routes.draw do
  root "pages#landing"
  get "load" => "words#load", :as => :load
  post "add_to_count" => "information#add_to_count", :as => :add_to_count
end
