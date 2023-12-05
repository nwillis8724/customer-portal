#!/usr/bin/env bash
# exit on error
set -o errexit

# Activate the Ruby environment
source /usr/share/rvm/bin/rvm
rvm use ruby 2.7.4
# builds the front end code
rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

# builds the back end code
bundle install
bundle exec rake db:migrate
bundle exec rake db:seed # if you have seed data, run this command for the initial deploy only