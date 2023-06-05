module Types
    class AuthPayloadType < Types::BaseObject
      field :user, Types::UserType, null: true
      field :token, String, null: true
    end
end
  