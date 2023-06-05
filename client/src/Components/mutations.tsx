import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
    { user { id name username  workDays 
    { id checkInTimestamp checkOutTimestamp 
    breaks {id checkInTimestamp checkOutTimestamp} } } token} 
  }
`;

export const CREATE_WORK_DAY_MUTATION = gql`
  mutation CreateWorkDay($userId: String!, $input: WorkDayInput!) {
    createWorkDay(userId: $userId, input: $input) {
      id
      checkInTimestamp
      checkOutTimestamp
    }
  }
`;

export const UPDATE_WORK_DAY_MUTATION = gql`
  mutation UpdateWorkDay($userId: ID!, $inputDate: String!, $workDay: UpdateWorkDayInput!) {
    updateWorkDay(userId: $userId, inputDate: $inputDate, workDay: $workDay) {
      id
      checkInTimestamp
      checkOutTimestamp
    }
  }
`;


export const CREATE_BREAK_MUTATION = gql`
  mutation CreateBreak($workDayId: String!, $input: BreakInput!) {
    createBreak(workDayId: $workDayId, input: $input) {
       id 
       checkInTimestamp 
       checkOutTimestamp  
    }  
  }
`;

export const UPDATE_BREAK_MUTATION = gql`
  mutation UpdateBreak($workDayId: String!, $id: String! $inputDate: String!,  $input: UpdateBreakInput!) {
    updateBreak(workDayId: $workDayId, id: $id, inputDate: $inputDate, input: $input) {
       id 
       checkInTimestamp 
       checkOutTimestamp  
    }  
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $username: String!,  $password: String!) {
    createUser(name: $name, username: $username, password: $password)  
    {user {id name username } token} 
  }
`;
