import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'tailwindcss/tailwind.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserProvider } from './Components/UserContext';
import AppProvider from './Components/AppProvider';
import { AppContext, appReducer, initialState } from './Components/reducer';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

function Root() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const appContextValue = { state, dispatch };

  return (
    <React.StrictMode>
      <AppProvider>
        <UserProvider>
          <AppContext.Provider value={appContextValue}>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </AppContext.Provider>
        </UserProvider>
      </AppProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
