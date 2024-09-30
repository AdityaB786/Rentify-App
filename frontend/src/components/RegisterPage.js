import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const validateInput = () => {
    const { name, email, password } = signupInfo;

    if (name.length < 3) {
      return "Name is too short.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is invalid.";
    }
    if (password.length < 4 ) {
      return "Password must be at least 4 characters long.";
    }
    return null; 
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo, [name]: value };
    setSignupInfo(copySignupInfo);
    setErrorMessage('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInput();
    
    if (validationError) {
      setErrorMessage(validationError); 
      return; 
    }
    const { name, email, password } = signupInfo;
    const url = 'http://localhost:3000/au/signup';

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      // Show success message and redirect to login page
      if (result.success) {
        setSuccessMessage('Signup successful!'); // Set success message
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
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
          <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>

          <form id="signup-form" className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              onChange={handleChange}
              required
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
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
              Register
            </button>
          </form>

          <div className="text-center mt-4 text-gray-600">
            Already a member?{" "}
            <Link className="text-black underline" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
