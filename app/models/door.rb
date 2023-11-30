class Door < ApplicationRecord
    belongs_to :job
    has_many :notes
  end