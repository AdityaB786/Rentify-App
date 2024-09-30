// src/components/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage({ setLoggedInUser }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    const url = 'http://localhost:3000/au/login';

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || 'Login failed. Please try again.'); 
      } else {
        setLoggedInUser({ name: result.name }); // Update the user state here
        setSuccessMessage('Login successful!');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-24 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {errorMessage}
        </div>
      )}

      <div className="min-h-screen bg-gray-100 pt-16">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto mt-8">
          <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="email"
              onChange={handleChange}
              required
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              name="password"
              onChange={handleChange}
              required
              type="password"
              placeholder="password"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4 text-gray-600">
            Don't have an account yet?{" "}
            <Link className="text-black underline" to="/register">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
