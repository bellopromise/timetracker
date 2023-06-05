module Types
    class WorkDayType < GraphQL::Schema::Object
      field :id, ID, null: false
      field :check_in_timestamp, String, null: true
      field :check_out_timestamp, String, null: true
      field :breaks, [BreakType], null: false
    end
  end
  