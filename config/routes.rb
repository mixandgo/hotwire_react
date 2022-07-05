Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  get "site/index"
  root "site#index"
end
