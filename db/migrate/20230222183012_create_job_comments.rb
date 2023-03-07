class CreateJobComments < ActiveRecord::Migration[7.0]
  def change
    create_table :job_comments do |t|
      t.integer :job_id
      t.text :comment
      t.integer :user_id
      t.timestamps
    end
  end
end
