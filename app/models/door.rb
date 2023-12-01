class Door < ApplicationRecord
    belongs_to :job
    has_many :notes


    def door_notes
      notes
    end
  end