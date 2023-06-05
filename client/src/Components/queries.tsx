import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
    query GetUser($id: ID!)
     { user(id: $id) { id name  workDays { id checkInTimestamp checkOutTimestamp 
     breaks {id checkInTimestamp checkOutTimestamp}  } } 
  }`;

