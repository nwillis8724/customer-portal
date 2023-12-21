class AddEmailToAdmins < ActiveRecord::Migration[6.1]
  def change
    add_column :admins, :email, :string
  end
end
