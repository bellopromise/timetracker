require 'graphql'
require_relative 'auth_payload_type'

module Types
  class MutationType < GraphQL::Schema::Object
    field :createUser, AuthPayloadType, null: true do
      argument :name, String, required: true
      argument :username, String, required: true
      argument :password, String, required: true
    end

    field :createWorkDay, WorkDayType, null: true do
      argument :userId, String, required: true
      argument :input, Types::WorkDayInput, required: true
    end

    field :updateWorkDay, WorkDayType, null: true do
      description "Update work day"
      argument :userId, ID, required: true
      argument :inputDate, String, required: true
      argument :workDay, UpdateWorkDayInput, required: true
    end

    field :createBreak, BreakType, null: true do
      argument :workDayId, String, required: true
      argument :input, Types::BreakInput, required: true
    end

    field :updateBreak, BreakType, null: true do
      description "Update break"
      argument :workDayId, String, required: true
      argument :id, String, required: true
      argument :inputDate, String, required: true
      argument :input, Types::UpdateBreakInput, required: true
    end

    field :login, Types::AuthPayloadType, null: true do
      description "Login user"
      argument :username, String, required: true
      argument :password, String, required: true
    end

    

    def createUser(name:, username:, password:)
      user = User.new(name: name, username: username, password: password)
      if user.save
        user

        token = generate_token(user.id)
        { user: user, token: token }
      else
        GraphQL::ExecutionError.new(" #{user.errors.full_messages.join(', ')}")
      end
    end

    def createWorkDay(userId:, input:)
      user = User.find_by(id: userId)

      if user
        new_work_day = user.work_days.new(
          check_in_timestamp: input.checkInTimestamp
        )

        if new_work_day.save
           new_work_day
        else
          GraphQL::ExecutionError.new("#{new_work_day.errors.full_messages.join(', ')}")
        end
      else
        GraphQL::ExecutionError.new("User with ID #{user_id} not found.")
      end
    end

    def updateWorkDay(userId:, inputDate:, workDay:)
      user = User.find_by(id: userId)
      return GraphQL::ExecutionError.new("User not found") unless user

      parsed_date = DateTime.parse(inputDate)
      
      work_day = user.work_days.find_by(check_in_timestamp: parsed_date.beginning_of_day..parsed_date.end_of_day)
      return GraphQL::ExecutionError.new("WorkDay not found") unless work_day

      if work_day.check_in_timestamp.to_date == parsed_date.to_date
        # Update the checkOutTimestamp field with the value from the input
        work_day.check_out_timestamp = workDay.checkOutTimestamp
    
        if work_day.save
          work_day
        else
          GraphQL::ExecutionError.new(" #{work_day.errors.full_messages.join(', ')}")
        end
      else
        GraphQL::ExecutionError.new("The input date does not match the check-in date of the WorkDay.")
      end
    end

    def createBreak(workDayId:, input:)
      work_day = WorkDay.find_by(id: workDayId)
    
      if work_day
        new_break = work_day.breaks.new(
          check_in_timestamp: input.checkInTimestamp
        )
    
        if new_break.save
          new_break
        else
          GraphQL::ExecutionError.new(" #{new_break.errors.full_messages.join(', ')}")
        end
      else
        GraphQL::ExecutionError.new("WorkDay with ID #{input.workDayId} not found.")
      end
    end

    def updateBreak(workDayId:,  id:,  inputDate:, input:)
      work_day = WorkDay.find_by(id: workDayId)
      return GraphQL::ExecutionError.new("Work day not found") unless work_day

      parsed_date = DateTime.parse(inputDate)
      
      the_break = work_day.breaks.find_by(id: id, check_in_timestamp: parsed_date.beginning_of_day..parsed_date.end_of_day)
      return GraphQL::ExecutionError.new("Break not found") unless work_day


        # Update the checkOutTimestamp field with the value from the input
        the_break.check_out_timestamp = input.checkOutTimestamp
    
        if the_break.save
          the_break
        else
          GraphQL::ExecutionError.new("#{the_break.errors.full_messages.join(', ')}")
        end
    end
    


    def login(username:, password:)
      user = User.find_by(username: username)
      
      if user && user.authenticate(password)
        # User authentication successful
        # Generate and return a token (e.g., JWT) for further authentication and authorization
        token = generate_token(user.id)
        { user: user, token: token }
      else
        # User authentication failed
        GraphQL::ExecutionError.new("Invalid username or password.")
      end
    end


    private 
    
    def generate_token(user_id)
      # Set the expiration time for the token (e.g., 1 hour from now)
      expiration_time = Time.now.to_i + 3600

      # Define the payload for the token
      payload = { user_id: user_id, exp: expiration_time }

      # Generate the token using JWT library
      token = JWT.encode(payload, 'your_secret_key', 'HS256')

      token
    end
  end
end
