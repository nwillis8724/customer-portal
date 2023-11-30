class AddAdminIdToNotes < ActiveRecord::Migration[6.1]
  def change
    add_column :notes, :admin_id, :integer
  end
end
