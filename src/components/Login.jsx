import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password validation
    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{6,15}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must contain at least one digit, be between 6 and 15 characters long.");
      return;
    }
    
    setError('');
    onLogin(formData.name);
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8"
      style={{
        backgroundImage: 'url(/images/UITDark.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img 
            className="w-20 md:w-24 h-auto" 
            src="/images/UIT-Logo-big.png"
            alt="UIT Logo"
          />
          <h1 className="glow-up text-uit text-2xl md:text-3xl font-bold">University of Information Technology</h1>
        </div>
        
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
          Welcome to <span className="text-blue-300">UIT Room Checker</span>
        </h2>
        
        <p className="glow-up-sub text-white text-lg md:text-xl max-w-3xl mx-auto">
          Check available rooms in real-time. Login to access the room availability system.
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              placeholder="Enter your password"
              required
            />
            {error && (
              <p className="mt-2 text-red-600 text-sm">{error}</p>
            )}
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="newsletter"
              defaultChecked
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="newsletter" className="ml-2 text-gray-700">
              Subscribe to our newsletter
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Login
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-600 mb-4">or sign in with</p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition"
              >
                <i className="fab fa-facebook-f text-blue-600"></i>
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition"
              >
                <i className="fab fa-google text-red-600"></i>
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition"
              >
                <i className="fab fa-twitter text-blue-400"></i>
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <i className="fab fa-github text-gray-800"></i>
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              By logging in, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </form>
      </div>

      <h2 className="glow-up-sub text-white text-lg md:text-xl mt-8 text-center">
        Towards a Brighter Future through Innovation in ICT
      </h2>
      
      <div className="mt-8 text-center">
        <p className="text-white/80 text-sm">
          Don't have an account?{' '}
          <button 
            onClick={() => onLogin('Guest')} 
            className="text-blue-300 hover:text-blue-200 font-medium hover:underline"
          >
            Continue as Guest
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;