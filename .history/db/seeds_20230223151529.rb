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

1000.times do
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

250.times do
    ContractorProfile.create!(
        zip: Faker::Address.zip_code, 
        travel_radius_miles: rand(10..300),
        user_id: User.all.sample.id
    )
end


# Contractor Specialties
puts "Seeding contractor specialties..."

contractor_profiles = ContractorProfile.all

2.times do
    contractor_profiles.map { | contractor_profile | 

        labor_category_ids = []
        contractor_profile.labor_categories.map { | labor_category | labor_category_ids.push(labor_category.id) }
    
        contractor_profile_id = contractor_profile["id"] 
        labor_category_id = LaborCategory.where.not(id: labor_category_ids).sample.id
        
        ContractorSpecialty.create!(contractor_profile_id: contractor_profile_id, labor_category_id: labor_category_id)
    }
end


# Property
puts "Seeding properties..."

users = User.all

users.map { | user | 

    Property.create!(
        street_address_1: Faker::Address.zip_code, 
        travel_radius_miles: rand(10..300),
        user_id: User.all.sample.id
    )

}




# Job
puts "Seeding jobs..."


# Job Labor Cateogies
puts "Seeding job labor categories..."


# Job Comments
puts "Seeding job comments..."