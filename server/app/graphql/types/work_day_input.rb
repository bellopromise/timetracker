module Types
  class WorkDayInput < Types::BaseInputObject
    graphql_name 'WorkDayInput'
    argument :checkInTimestamp, GraphQL::Types::ISO8601DateTime, required: true
  end
end
