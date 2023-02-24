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

labor_categories = [
'Carpet Cleaning',
'Electrical',
'General Contracting / Remodeling',
'Gutter Cleaning / Repair',
'Handyperson',
'HVAC',
'Landscaping',
'Lawn & Garden Care',
'Painting',
'Patios',
'Plumbing',
'Pool Installation',
'Roofing'
]

labor_categories.map { | labor_category | LaborCategory.create!(name: labor_category) }


# Users & Profiles
puts "Seeding users and profiles..."

100.times do
    fake_user = {
        "first_name" => Faker::Name.first_name_neutral,
        "last_name" => Faker::Name.last_name,
        "image" => Faker::Avatar.image,
        "password" => Faker::Internet.password
    }

    fake_user["email"] = (fake_user["last_name"] + "." + fake_user["first_name"] + "@" + Faker::Internet.domain_name).downcase
    
    user = User.create!(email: fake_user["email"], password: Faker::Internet.password)

    Profile.create!(
        first_name: fake_user["first_name"], 
        last_name: fake_user["last_name"],
        image: fake_user["image"],
        user_id: user.id
    )

end



# Contractor Profile
puts "Seeding contractor profiles..."


Profile.create!(
    zip: fake_user["first_name"], 
    travel_radius_miles: fake_user["last_name"],
    user_id: user.id
)

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