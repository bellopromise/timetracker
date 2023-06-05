module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :user, UserType, null: true do
      description 'Find a user by ID'
      argument :id, ID, required: true
    end

    field :users, [UserType], null: false, description: 'Get all users'
    def users
      User.all
    end

    def user(id:)
      User.find_by(id: id)
    end

    field :createUser, UserType, null: true do
      argument :name, String, required: true
    end

    def create_user(name:)
      User.create(name: name)
    end
  end
end
