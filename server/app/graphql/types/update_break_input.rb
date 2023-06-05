module Types
    class UpdateBreakInput < Types::BaseInputObject
      graphql_name 'UpdateBreakInput'
      argument :checkOutTimestamp, GraphQL::Types::ISO8601DateTime, required: true
    end
end
  