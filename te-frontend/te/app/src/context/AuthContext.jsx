import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { userId: action.payload.userId, accessToken: action.payload.accessToken };
    case 'logout':
      return { userId: null, accessToken: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, { userId: null, accessToken: null });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    if (accessToken) {
      dispatch({ type: 'login', payload: { userId, accessToken } });
    }
  }, []);

  const login = (userId, accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
    dispatch({ type: 'login', payload: { userId, accessToken } });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    dispatch({ type: 'logout' });
    navigate("/");
  };


  return (
    <AuthenticationContext.Provider value={{ userId: state.userId, accessToken: state.accessToken, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
