import { useQuery } from '@apollo/client';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { GET_USER_QUERY } from './queries';
import { User, UserContext } from './UserContext';
import { useApolloClient, gql } from '@apollo/client';
import client from '../client';


interface DecodedToken {
    exp: number;
    user_id?: string;
  }

  

  export const fetchUserData = async (userId: string | undefined) : Promise<User | null>  => {
    try {
      const response = await client.query({
        query: GET_USER_QUERY,
        variables: { id: userId },
        fetchPolicy: 'network-only',
      });
      return response.data.user;
    } catch (error) {
      console.error('Error fetching user data:', error);
        return null;
    }
  };

  
  const checkAuthorization = (token: string | null): boolean => {
    if (token) {
      try {
        const decodedToken: DecodedToken = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000);
  
        if (decodedToken.exp > currentTime && decodedToken.user_id) {
          return true;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return false;
  };


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(UserContext);
    const token: string | null = localStorage.getItem('token');
    const decodedToken: DecodedToken | null = token ? jwt_decode(token) : null;
  
    useEffect(() => {
  
      if (!checkAuthorization(token)) {
        console.log('Unauthorized access. Redirecting to Login page...');
        navigate('/login');
      } else {
        fetchUserData(decodedToken?.user_id)
          .then((fetchedUser) => {
            if (fetchedUser) {
              updateUser(fetchedUser);
            }
          });
      }
    }, [token, user, decodedToken, updateUser, navigate]);
  
    return <>{children}</>;
  };
  
  export default PrivateRoute;
  
  