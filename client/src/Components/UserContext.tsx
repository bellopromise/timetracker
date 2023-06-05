import React, { createContext, useState, ReactNode } from 'react';

export interface Break {
    id: string;
    checkInTimestamp: string;
    checkOutTimestamp: string | null;
  }
  
export interface WorkDay {
    id: string;
    checkInTimestamp: string;
    checkOutTimestamp: string | null;
    breaks: Break[];
}
  
export interface Validation{
    errorMessage: string;
    status: boolean  | ''
}

export interface User {
    id: string;
    name: string;
    workDays: WorkDay[];
}

export interface WorkDuration {
    hours: number;
    minutes: number;
}
  

  
interface UserContextProps {
  user: User | null;
  updateUser: (userData: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  updateUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (userData: User | null) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
