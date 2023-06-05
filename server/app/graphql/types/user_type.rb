module Types
    class UserType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :username, String, null: false
      field :work_days, [Types::WorkDayType], null: true
      # Add other fields as needed
    end

    def work_days
        object.work_days
    end
end