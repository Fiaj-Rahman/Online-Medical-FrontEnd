import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    image: null,
    nationality: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Basic form validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation (simple check for numeric input)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Password validation
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.image) newErrors.image = 'Profile Image is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);

    // Only submit if there are no errors
    if (Object.keys(newErrors).length === 0) {
      console.log('Form Data:', formData);
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        image: null,
        nationality: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      });
      setImagePreview(null);
      setErrors({});
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900">
      <div className="w-full max-w-md p-8 my-10 rounded-lg shadow-lg bg-gray-100 text-gray-800 ">

        {/* Form Header */}
        <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">Create Your Account</h2>

        {/* Social Media Login */}
        <div className="my-6 space-y-4">
          <button className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-700 focus:ring-violet-400 hover:bg-violet-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm text-gray-800">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-md ${errors.fullName ? 'border-red-400' : 'border-gray-700'} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
            />
            {errors.fullName && <span className="text-xs text-red-400">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-gray-800">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="leroy@jenkins.com"
              className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-400' : 'border-gray-700'} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
            />
            {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-sm text-gray-800">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Your phone number"
              className={`w-full px-4 py-2 border rounded-md ${errors.phoneNumber ? 'border-red-400' : 'border-gray-700'} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
            />
            {errors.phoneNumber && <span className="text-xs text-red-400">{errors.phoneNumber}</span>}
          </div>

          {/* Nationality */}
          <div className="space-y-2">
            <label htmlFor="nationality" className="block text-sm text-gray-800">Nationality</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Your nationality"
              className={`w-full px-4 py-2 border rounded-md ${errors.nationality ? 'border-red-400' : 'border-gray-700'} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
            />
            {errors.nationality && <span className="text-xs text-red-400">{errors.nationality}</span>}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm text-gray-800">Profile Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.image ? 'border-red-400' : 'border-gray-700'} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
            />
            {errors.image && <span className="text-xs text-red-400">{errors.image}</span>}
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
              </div>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className={`w-full px-4 py-2 border rounded-md ${errors.password ? 'border-red-400' : 'border-gray-700'} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
            />
            {errors.password && <span className="text-xs text-red-400">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm text-gray-800">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className={`w-full px-4 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-400' : 'border-gray-700'} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
            />
            {errors.confirmPassword && <span className="text-xs text-red-400">{errors.confirmPassword}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-blue-900 text-gray-100 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-violet-400">
            Sign Up
          </button>

          <p className="text-xs text-center sm:px-6 text-gray-400"> If you have an account,
            <Link className="underline text-indigo-600" to={'/login'}>Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
