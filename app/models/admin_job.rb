class AdminJob < ApplicationRecord
    belongs_to :admin
    belongs_to :job
end
