class CreateJobLaborCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :job_labor_categories do |t|
      t.integer :job_id
      t.integer :labor_category_id

      t.timestamps
    end
  end
end
