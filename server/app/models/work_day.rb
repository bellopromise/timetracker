class WorkDay < ApplicationRecord
    attribute :check_in_timestamp, :datetime
    belongs_to :user
    has_many :breaks, dependent: :destroy
end