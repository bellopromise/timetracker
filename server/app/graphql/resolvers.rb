module Resolvers
  class QueryResolver
    def work_days(user_id)
      User.find(user_id).work_days
    end

    def user(id)
      User.find(id)
    end
  end

  class MutationResolver
    def createWorkDay(user_id, work_day)
      User.find(user_id).work_days.create(work_day.to_h)
    end

    def update_work_day(id, work_day)
      WorkDay.find(id).update(work_day.to_h)
      WorkDay.find(id)
    end

    def delete_work_day(id)
      WorkDay.find(id).destroy
      id
    end
  end
end
