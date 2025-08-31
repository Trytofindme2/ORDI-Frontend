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
          ORDI
        </a>

        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
          Create an account
        </h1>

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
