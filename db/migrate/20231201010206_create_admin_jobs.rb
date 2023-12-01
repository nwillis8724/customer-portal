class CreateAdminJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :admin_jobs do |t|
      t.integer :admin_id
      t.integer :job_id

      t.timestamps
    end
  end
end
