import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerificationContext } from '../../context/verificationContext';
import userAPI from '../../helper/userAPI';
import { AuthContext } from '../../context/authContext';

const Verification = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { email, password } = useContext(VerificationContext);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext)

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setCode(value);
      if (error) setError('');
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Please enter a 6-digit code.');
      return;
    }
    try {
      const data = { email, password, code };
      const response = await userAPI.post('verified', data);
      if (response.status === 200) {
        dispatch({ type: 'user-verified', payload: response.data.data })
        navigate('/user/ordi/editProfile' , { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.data?.errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-xs bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Verify Your Email</h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          We’ve sent a 6-digit code to your {email || 'email'}. Enter it below to continue.
        </p>

        <form className="mt-6 space-y-2" onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={handleInputChange}
            inputMode="numeric"
            className={`w-full text-center tracking-widest text-xl px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition
              ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          />
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={code.length !== 6}
            className={`w-full py-3 text-white text-sm font-semibold rounded-lg transition
              ${code.length === 6 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
          >
            Verify Email
          </button>
        </form>

        <div className="mt-2 text-center text-[11px] text-gray-400">
          Verification helps us secure your account and personalize your Ordi experience.
        </div>
      </div>
    </div>
  );
};

export default Verification;
