class AddImageUrlToAdmins < ActiveRecord::Migration[6.1]
  def change
    add_column :admins, :image_url, :string
  end
end
