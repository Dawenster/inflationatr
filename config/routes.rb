Rails.application.routes.draw do
  root "pages#landing"
  get "load" => "words#load", :as => :load
end
