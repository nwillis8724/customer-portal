class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.string :address
      t.string :date_of_install
      t.string :access_code
      t.string :admin_id

      t.timestamps
    end
  end
end
