module Types
    class BreakType < GraphQL::Schema::Object
      field :id, ID, null: false
      field :check_in_timestamp, String, null: true
      field :check_out_timestamp, String, null: true
      field :work_day_id, ID, null: false
    end
  end
  