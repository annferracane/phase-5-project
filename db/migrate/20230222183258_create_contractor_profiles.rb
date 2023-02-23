class CreateContractorProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :contractor_profiles do |t|
      t.string :zip
      t.integer :travel_radius_miles
      t.integer :user_id

      t.timestamps
    end
  end
end
