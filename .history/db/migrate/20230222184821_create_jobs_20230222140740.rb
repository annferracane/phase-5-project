class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.string :title
      t.text :description
      t.string :timeline
      t.boolean :is_accepted
      t.boolean :is_completed
      t.integer :user_id
      t.integer :contractor_profile_id

      t.timestamps
    end
  end
end
