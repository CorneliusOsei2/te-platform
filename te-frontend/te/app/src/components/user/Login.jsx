import axiosInstance from '../../axiosConfig';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState('')
    const [loginData, setLoginData] = useState({ username: "", password: "" })

    const handleLogin = () => {
        axiosInstance.post('users.login', {
            username: loginData.username,
            password: loginData.password
        })
            .then((response) => {
                let data = response.data
                login(data["access_token"]);
                navigate(localStorage.getItem("prevPage") || "/");
            })
            .catch((error) => {
                setError(error);
            });
    }

    const handleInputChange = ({ name, value }) => {
        setLoginData({ ...loginData, [name]: value });
    };

    return (
        <>
            <div className="sm:flex flex-col justify-center sm:items-start">
                <div className="mt-2 ml-6">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="flex flex-col mt-6 rounded-md">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={loginData.username}
                                autoComplete="username"
                                className="flex-1 mt-3 border-0 bg-transparent py-1.5 pl-1  focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="username"
                                onChange={(e) => handleInputChange({ "name": "username", "value": e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col mt-6 rounded-md">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={loginData.password}
                                autoComplete="password"
                                className="flex-1 mt-3 border-0 bg-transparent py-1.5 pl-1  focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="password"
                                onChange={(e) => handleInputChange({ "name": "password", "value": e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex justify-center w-full">
                    <button
                        type="button"
                        className="rounded-full bg-blue-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        onClick={handleLogin}
                    >
                        Log In!
                    </button>
                </div>
            </div>
        </>
    )
};


export default Login;