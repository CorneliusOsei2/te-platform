import axiosInstance from '../../axiosConfig';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BriefcaseIcon, DocumentIcon, CodeBracketIcon, ComputerDesktopIcon, XCircleIcon } from '@heroicons/react/20/solid'


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
                login(response.data.token.sub, response.data.token.access_token);
                navigate(localStorage.getItem("prevPage") || "/");
            })
            .catch((error) => {
                setError(error.response.data.detail);
            });
    }

    const handleInputChange = ({ name, value }) => {
        setLoginData({ ...loginData, [name]: value });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log In
                    </h2>
                </div>
                {error &&
                    <div className="sm:mx-auto mt-6 sm:w-full sm:max-w-sm rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">{error} </h3>
                            </div>
                        </div>
                    </div>
                }

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    value={loginData.username}
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleInputChange({ "name": "username", "value": e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    value={loginData.password}
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleInputChange({ "name": "password", "value": e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='button'
                                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                onClick={handleLogin}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};


export default Login;

