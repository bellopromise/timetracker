module Types
    class BreakInput < Types::BaseInputObject
      graphql_name 'BreakInput'
      argument :checkInTimestamp, GraphQL::Types::ISO8601DateTime, required: true
    end
  end
  