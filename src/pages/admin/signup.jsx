import React, { useState } from 'react';
import adminAPI from '../../helper/adminAPI';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          setNameError('Name is required');
          return false;
        } else {
          setNameError('');
          return true;
        }
      case 'email':
        if (!value.trim()) {
          setEmailError('Email is required');
          return false;
        } else if (!validateEmail(value)) {
          setEmailError('Please enter a valid email address');
          return false;
        } else {
          setEmailError('');
          return true;
        }
      case 'password':
        if (!value) {
          setPasswordError('Password is required');
          return false;
        } else if (value.length < 6) {
          setPasswordError('Password must be at least 6 characters');
          return false;
        } else {
          setPasswordError('');
          return true;
        }
      case 'repeatPassword':
        if (!value) {
          setRepeatPasswordError('Please confirm your password');
          return false;
        } else if (value !== password) {
          setRepeatPasswordError('Passwords do not match');
          return false;
        } else {
          setRepeatPasswordError('');
          return true;
        }
      default:
        return true;
    }
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNameValid = validateField('name', name);
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);
    const isRepeatPasswordValid = validateField('repeatPassword', repeatPassword);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isRepeatPasswordValid) {
        toast.error('Please fill all fields correctly before submitting.');
        return;
    }

    setLoading(true);

    try {
        const data = { name, email, password };
        const response = await adminAPI.post('create', data);
        if (response.status === 200) {
        toast.success('Account created successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setRepeatPasswordError('');
        setTimeout(() => {
            navigate('/admin/log-in');
        }, 1000);
        }
    } catch (error) {
        const message =
        error?.response?.data?.data?.errorMessage ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to create account. Please try again.';
        toast.error(message);
    } finally {
        setLoading(false);
    }
    };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            ORDI
          </a>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
            Create an account for Admin
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                id="name"
                placeholder="Enter Name"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white
                  focus:ring-primary-600 focus:border-primary-600
                  ${
                    nameError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                  }`}
              />
              {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur}
                id="email"
                placeholder="name@gmail.com"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white
                  focus:ring-primary-600 focus:border-primary-600
                  ${
                    emailError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                  }`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur}
                id="password"
                placeholder="Enter Password"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white
                  focus:ring-primary-600 focus:border-primary-600
                  ${
                    passwordError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                  }`}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="repeatPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                onBlur={handleBlur}
                id="repeatPassword"
                placeholder="Confirm Password"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white
                  focus:ring-primary-600 focus:border-primary-600
                  ${
                    repeatPasswordError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                  }`}
              />
              {repeatPasswordError && <p className="text-red-500 text-sm mt-1">{repeatPasswordError}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
              {loading ? 'Creating account...' : 'Create an account'}
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center mt-4">
              Already have an account?{' '}
              <Link
                to="/admin/log-in"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
