module Types
    class PartialWorkDayInput < Types::BaseInputObject
      graphql_name 'PartialWorkDayInput'
      argument :checkInTimestamp, GraphQL::Types::ISO8601DateTime, required: false
      argument :checkOutTimestamp, GraphQL::Types::ISO8601DateTime, required: false
    end
end
  