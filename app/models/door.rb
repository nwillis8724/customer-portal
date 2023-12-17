class Door < ApplicationRecord
    belongs_to :job
    has_many :notes

    validates :model, :size, :color, :date_of_arrival, presence: true
    validates :date_of_arrival, format: { with: /\A\d{2}\/\d{2}\/\d{4}\z/, message: "should be in the format xx/xx/xxxx" }

    def door_notes
      notes
    end

  end