class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :note
      t.integer :job_id
      t.integer :door_id

      t.timestamps
    end
  end
end
