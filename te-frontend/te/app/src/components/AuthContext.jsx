import { createContext, useContext, useEffect, useReducer } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { accessToken: action.payload.accessToken };
    case 'logout':
      return { accessToken: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { accessToken: null });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch({ type: 'login', payload: { accessToken } });
    }
  }, []);

  const login = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    dispatch({ type: 'login', payload: { accessToken } });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'logout' });

  };


  return (
    <AuthenticationContext.Provider value={{ accessToken: state.accessToken, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
