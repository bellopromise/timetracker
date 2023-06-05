# Factorial HR
## Description

Hello, this is my solution to the coding test. This component exposes a Graphql endpoint for checking in and out of a work day for employees.  This was built using [Graphql](https://graphql.org/) , [React]() for the UI interface.


## How to install

### Using Git (recommended)

```sh
$ git clone https://github.com/bellopromise/timetracker # or clone your own fork
$ cd path/to/directory //
$ git checkout main
```
### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory



### Run the application using cli 
```bash
$ cd server
$ bundle install
$ rails db:migrate
$ rails s
$ cd client
$ npm install
$ npm start
```

## How to Test the app

- Create An account for the user, you can't login without having an account.
- Login to the application
- Check in and choose a time.
**Note that choosing a time is for the sake of testing, an ideal application will automatically keep track of the current time**
- Take as many breaks as you want, but the break can not overlap.
- Check out for the day.
- You can only checkout once as a user.
**To test for many scenarios, you can register as many users as you want or manipulate the DB**



## GRAPHQL Endpoints

- URL: `http://localhost:3000/graphql`

- Get users Query

```bash
{
    "query": "query { users { id name workDays { id checkInTimestamp checkOutTimestamp breaks {checkInTimestamp checkOutTimestamp}  } } }"
}
```
- Create user mutation
```bash
{
    "query": "mutation CreateUser($name: String! $username: String!,  $password: String!) { createUser(name: $name username: $username, password: $password) { user {id name username } token}}",
  "variables": {
    "name": "The guy",
    "username": "john_doe7",
    "password": "secretpassword"
  }
}
```
- Login Mutation
```bash
{
  "query": "mutation Login($username: String!, $password: String!) { login(username: $username, password: $password)  { user { id name username  workDays  { id checkInTimestamp checkOutTimestamp  breaks {id checkInTimestamp checkOutTimestamp} }  } token} } ",
  "variables": {
    "username": "chioma",
    "password": "secretpassword"
  }
}
```

- Get User By Id Query
```bash
{
  "query": "query GetUser($id: ID!) { user(id: $id) { id name  workDays { id checkInTimestamp checkOutTimestamp breaks {checkInTimestamp checkOutTimestamp}}  } }",
  "variables": {
    "id": "5"
  }
}
```

- Create Workday Mutation
```bash
{
    "query": "mutation CreateWorkDay($userId: String!, $input: WorkDayInput!) { createWorkDay(userId: $userId, input: $input) { id checkInTimestamp checkOutTimestamp } }",
  "variables": {
    "userId": "1",
    "input": {
      "checkInTimestamp": "2023-05-26T09:00:00Z"
    }
  }
}
```

- Update Workday Mutation
```bash
{
"query": "mutation UpdateWorkDay($userId: ID!, $inputDate: String!, $workDay: UpdateWorkDayInput!) { updateWorkDay(userId: $userId, inputDate: $inputDate, workDay: $workDay) { id checkInTimestamp checkOutTimestamp   } }",
"variables": {
  "userId": "1",
  "inputDate": "2023-05-26",
  "workDay": {
    "checkOutTimestamp": "2023-05-26T17:00:00Z"
  }
}
}
```

- Create Break Mutation
```bash
{
  "query": "mutation CreateBreak($workDayId: String!, $input: BreakInput!) { createBreak(workDayId: $workDayId, input: $input) { id checkInTimestamp checkOutTimestamp  } }",
  "variables": {
    "workDayId": "1",
    "input": {
      "checkInTimestamp": "2023-05-26T12:00:00Z"
      
    }
  }
}
```

- Update Break Mutation
```bash
{
  "query": "mutation UpdateBreak($workDayId: String!, $id: String!, $inputDate: String!, $input: UpdateBreakInput!) { updateBreak(workDayId: $workDayId, id: $id, inputDate: $inputDate, input: $input) { id checkInTimestamp checkOutTimestamp  } }",
  "variables": {
    "workDayId": "14",
    "id": "17",
    "inputDate": "2023-05-31",
    "input": {
      "checkOutTimestamp": "2023-05-31T20:00:00Z"  
    }
  }
}
```

## What was not included due to time constraint
- Unit Testing
- End to end testing


## Support
For more questions and clarifications, you can reach out to me here `bellopromise5322@gmail.com`

