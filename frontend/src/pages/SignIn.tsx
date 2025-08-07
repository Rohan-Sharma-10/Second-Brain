import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { BACKEND_URL } from "../config";

export function SignIn() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function signIn() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await axiosInstance.post(
                `${BACKEND_URL}/api/auth/login`,
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                localStorage.setItem("accessToken", `${response.data.accessToken}`);
                navigate("/dashboard");
            }
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setError("Invalid email or password");
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Welcome back!
                    </p>
                </div>

                {/* Display error */}
                {error && (
                    <div className="text-red-600 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <input
                                ref={emailRef}
                                required
                                className="appearance-none rounded-lg relative block w-full pl-3 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <input
                                ref={passwordRef}
                                required
                                type="password"
                                className="appearance-none rounded-lg relative block w-full pl-3 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={signIn}
                            type="button"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
