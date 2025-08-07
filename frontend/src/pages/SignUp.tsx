import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignUp() {
    const usernameRef = useRef<HTMLInputElement>(null); // HTMLInputElement: Ensures the ref can only reference an <input> element.
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function signUp() {
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !email || !password) {
          setError("All fields are required.");
          return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }

        try {
          const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
            username,
            email,
            password
        })

        if(response.status === 200) {
            navigate("/signin");
        }
        } catch (err: any) {
          if (err.response) {
              const errorMessage = err.response.data.msg;

              if (errorMessage.toLowerCase().includes("User already exists.")) {
                  setError("User with this email already exists. Please sign in.");
              } else {
                  setError(errorMessage || "Invalid Credentials.");
              }
          }
      }
    }
    
    return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of users and start your journey
          </p>
        </div>

        {/* Error message */}
        {error && (
                    <div className="text-red-600 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

             


        {/* Form */}
        <form className="mt-8 space-y-6" >
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="h-5 w-5 text-purple-500" />
                </div>
                <input
                  ref={usernameRef}
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="h-5 w-5 text-purple-500" />
                </div>
                <input
                  ref={emailRef}
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="h-5 w-5 text-purple-500" />
                </div>
                <input
                  ref={passwordRef}
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <div>
            <button
              onClick={signUp}
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <div className="h-5 w-5 text-purple-300 group-hover:text-purple-200" />
              </span>
              Sign up
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/signin" className="font-medium text-purple-600 hover:text-purple-500">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}