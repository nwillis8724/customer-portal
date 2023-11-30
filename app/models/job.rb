class Job < ApplicationRecord
    belongs_to :admin
    has_many :doors
  end