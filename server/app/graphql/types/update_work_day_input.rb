module Types
    class UpdateWorkDayInput < Types::BaseInputObject
      graphql_name 'UpdateWorkDayInput'
      argument :checkOutTimestamp, GraphQL::Types::ISO8601DateTime, required: true
    end
end