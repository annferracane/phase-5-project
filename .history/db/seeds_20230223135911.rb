# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).


# Destroy Data
JobComment.destroy_all
JobLaborCategory.destroy_all
Job.destroy_all
Property.destroy_all
ContractorSpecialty.destroy_all
ContractorProfile.destroy_all
Profile.destroy_all
User.destroy_all
LaborCategory.destroy_all

# Requirements
require 'faker'

# LaborCategory
puts "Seeding labor categories..."

labor_categories = ['','',]


# Users & Profiles
puts "Seeding users and profiles..."

100.times do
    fake_user = {
        "first_name" => Faker::Name.first_name_neutral,
        "last_name" => Faker::Name.last_name,
        "image" => Faker::Avatar.image,
        "password" => Faker::Internet.password,
        "city" => Faker::Address.city,
        "state" => Faker::Address.state_abbr,
        "gender" => Faker::Gender.type,
        "hobby" => Faker::Hobby.activity
    }



# Contractor Profile
puts "Seeding contractor profiles..."


# Contractor Specialties
puts "Seeding contractor specialties..."


# Property
puts "Seeding properties..."


# Job
puts "Seeding jobs..."


# Job Labor Cateogies
puts "Seeding job labor categories..."


# Job Comments
puts "Seeding job comments..."