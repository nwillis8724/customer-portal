class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :note
      t.string :job_id
      t.string :door_id

      t.timestamps
    end
  end
end
