class CreateDoors < ActiveRecord::Migration[6.1]
  def change
    create_table :doors do |t|
      t.string :model
      t.string :size
      t.string :color
      t.string :date_of_arrival
      t.string :job_id

      t.timestamps
    end
  end
end
