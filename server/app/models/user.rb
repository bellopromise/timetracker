class User < ApplicationRecord
    has_many :work_days

    has_secure_password


    validates :username, presence: true, uniqueness: true
end
  