class Note < ApplicationRecord
  belongs_to :job, optional: true
  belongs_to :door, optional: true
  belongs_to :admin, optional: true


    def poster_name
      admin&.username || 'customer'
    end
  end