class CreateContractorSpecialties < ActiveRecord::Migration[7.0]
  def change
    create_table :contractor_specialties do |t|
      t.integer :contractor_profile_id
      t.integer :labor_category_id

      t.timestamps
    end
  end
end
