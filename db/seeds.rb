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
'General Contracting & Renovations',
'Gutter Cleaning & Repair',
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
        "password" => Faker::Internet.password + '12345678'
    }

    fake_user["email"] = (fake_user["last_name"] + "." + fake_user["first_name"] + "@gmail.com")
    
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

25.times do
    ContractorProfile.create!(
        zip: Faker::Address.zip_code.first(5),
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
    
        contractor_profile_id = contractor_profile.id
        labor_category_id = LaborCategory.where.not(id: labor_category_ids).sample.id
        
        ContractorSpecialty.create!(contractor_profile_id: contractor_profile_id, labor_category_id: labor_category_id)
    }
end


# Property
puts "Seeding properties..."

users = User.all
users_limited = User.limit(50)
users_limited_small = User.limit(25)

user_groups = [users, users_limited, users_limited_small]

user_groups.map { | user_group | 

    user_group.map { | user | 

        Property.create!(
            street_address_1: Faker::Address.street_address, 
            street_address_2: [nil, Faker::Address.secondary_address].sample,
            city: Faker::Address.city,
            state: Faker::Address.state_abbr,
            zip: Faker::Address.zip_code.first(5),
            lat: Faker::Address.latitude, 
            lng: Faker::Address.longitude,
            country: 'United States',
            property_category: ['Commercial', 'Residential'].sample,
            user_id: user.id
        )
    }
}

# Job
puts "Seeding jobs..."

timeline = [
    'ASAP',
    'Not urgent or just exploring',
    'Within the week',
    'Within the month',
    'In the next 2-3 months',
    'In the next 6 months',
    'Not urgent or just exploring'
    ]

properties = Property.all
properties_limited = Property.limit(85)
properties_limited_small = Property.limit(40)

property_groups = [properties, properties_limited, properties_limited_small]

property_groups.map { | property_group | 

    property_group.map { | property | 

        Job.create!(
            title: [Faker::House.room.capitalize + ' ' + Faker::Lorem.words.to_sentence(words_connector: ' ' , last_word_connector: ' '), Faker::Lorem.words.to_sentence(words_connector: ' ' , last_word_connector: ' ').capitalize + ' ' + Faker::House.room].sample, 
            description: Faker::Lorem.paragraphs.join(' '),
            timeline: timeline.sample,
            is_accepted: false,
            is_completed: false,
            property_id: property.id,
            contractor_profile_id: [ContractorProfile.all.sample.id, nil].sample
        )
    }
}

jobs = Job.where.not(contractor_profile_id: nil)

jobs.map { | job |
    job.update!(is_accepted: true)
    job.update!(is_completed: [false, true].sample)
}


# Job Labor Categories
puts "Seeding job labor categories..."

jobs = Job.all

jobs.map { | job | 

    labor_category_ids = []

    if job.contractor_profile 
        job.contractor_profile.contractor_specialties.map { | contractor_specialty | labor_category_ids.push(contractor_specialty.labor_category.id) }
    else
        LaborCategory.all.map { | labor_category | labor_category_ids.push(labor_category.id) }
    end
        
    job_id = job.id
    labor_category_id = labor_category_ids.sample
    
    JobLaborCategory.create!(job_id: job_id, labor_category_id: labor_category_id)
}


# Job Comments
puts "Seeding job comments..."

jobs = Job.limit(100)

2.times do

    jobs.map { | job | 

        comments = [
            'Try ' + Faker::Name.gender_neutral_first_name + ' ' + Faker::Name.last_name + '!',
            'I recommend ' + Faker::Name.gender_neutral_first_name + ' ' + Faker::Name.last_name + '. They are local.',
            'Consider ' + Faker::Name.gender_neutral_first_name + ' ' + Faker::Name.last_name,
            'Recommend ' + Faker::Name.last_name + '. Can''t remember first name, but he''s great.',
            Faker::Quote.yoda,
            Faker::Quote.fortune_cookie,
            Faker::Lorem.paragraph
        ]
    
        job_id = job.id
        comment = comments.sample
        
        JobComment.create!(job_id: job_id, comment: comment, user_id: User.all.sample.id)
    }

end
