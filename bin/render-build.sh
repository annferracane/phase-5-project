#!/usr/bin/env bash
# exit on error
set -o errexit

# Build commands for front end to create the production build
rm -rf public
npm install --prefix client && npm run build:production --prefix client
cp -a client/build/. public/

# Build commands for back end
bundle install
bundle exec rails db:migrate 
bundle exec rails db:seed # if you have seed data, run this command for the initial deploy only to avoid duplicate records