import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userAPI from '../../helper/userAPI';
import { VerificationContext } from '../../context/verificationContext';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [RepeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const { dispatch } = useContext(VerificationContext);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== RepeatPassword) {
      const err = 'Passwords do not match';
      setErrorMsg(err);
      toast.error(err);
      return;
    }

    const data = { email, password };

    try {
      setLoading(true);
      const response = await userAPI.post('sendVerificationCode', data);
      if (response.status === 200) {
        toast.success(`Verification code sent to ${email}`);
        dispatch({ type: 'sign-up', payload: { email, password } });
        navigate('/user/verification');
      }
    } catch (error) {
      const err = error.response?.data?.data?.errorMessage || error.message;
      setErrorMsg(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-8">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>

        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
          Create an account
        </h1>

        <button
          type="button"
          disabled={loading}
          className="w-full text-white flex items-center justify-center mb-6 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path fill="#4285F4" d="M17.64 9.2045c0-.638-.0574-1.251-.1645-1.84H9v3.48h4.844c-.209 1.124-.846 2.078-1.804 2.72v2.256h2.915c1.708-1.572 2.695-3.89 2.695-6.616z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.474-.8 5.965-2.165l-2.915-2.256c-.808.54-1.844.863-3.05.863-2.348 0-4.337-1.586-5.045-3.72H.987v2.34A9 9 0 009 18z" />
              <path fill="#FBBC05" d="M3.955 10.722a5.4 5.4 0 010-3.444V4.94H.987a9.004 9.004 0 000 8.12l2.968-2.338z" />
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.506.455 3.44 1.347l2.58-2.58C13.466.88 11.42 0 9 0 5.523 0 2.446 1.99.987 4.94l2.968 2.34c.708-2.134 2.697-3.7 5.045-3.7z" />
            </g>
          </svg>
          Sign up with Google
        </button>

        <form className="space-y-5" onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm password
            </label>
            <input
              type="password"
              name="confirm-password"
              value={RepeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              id="confirm-password"
              placeholder="Confirm Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium rounded-lg text-sm px-5 py-2.5 text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {loading ? 'Sending Email...' : 'Create an account'}
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
            Already have an account?{' '}
            <Link
              to={'/user/log-in'}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
