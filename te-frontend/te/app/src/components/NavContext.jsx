import { createContext, useContext, useEffect, useReducer } from 'react';

const NavigationContext = createContext();

export const useNav = () => {
    return useContext(NavigationContext);
}

const navReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return { accessToken: action.payload.accessToken };
        case 'logout':
            return { accessToken: null };
        default:
            return state;
    }
}

export const NavProvider = ({ children }) => {
    const [state, dispatch] = useReducer(navReducer, { accessToken: null });

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
        <NavigationContext.Provider value={{ accessToken: state.accessToken, login, logout }}>
            {children}
        </NavigationContext.Provider>
    );
}
