import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import adminAPI from "../../helper/adminAPI";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const { dispatch } = useContext(AuthContext)

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        if (!value) {
          setEmailError("Email is required");
          return false;
        } else if (!validateEmail(value)) {
          setEmailError("Please enter a valid email address");
          return false;
        } else {
          setEmailError("");
          return true;
        }

      case "password":
        if (!value) {
          setPasswordError("Password is required");
          return false;
        } else if (value.length < 6) {
          setPasswordError("Password must be at least 6 characters");
          return false;
        } else {
          setPasswordError("");
          return true;
        }
      default:
        return true;
    }
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const isEmailValid = validateField("email", email);
    const isPasswordValid = validateField("password", password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);
    try {
      const response = await adminAPI.post('log-in', { email, password } , { withCredentials : true });
      if (response.status === 200) {
        toast.success('Login successful!');
        dispatch({ type: 'admin-log-in', payload: response.data.data });
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        setTimeout(() => {
          navigation('/admin/dashboard');
        }, 500);
      }
    } catch (error) {
      const message =
        error?.response?.data?.data?.errorMessage ||
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row min-h-screen relative">
        <div className="bg-gray-900 text-white p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
          <div className="z-10">
            <h2 className="text-2xl font-bold mb-6">ORDI</h2>
            <div className="mt-10 md:mt-20">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Sign in to Admin Dashboard
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-6">
                Welcome back, Admin
              </h2>
              <p className="max-w-md opacity-90 text-sm md:text-base">
                Please sign in to manage users, oversee food content, and monitor
                platform performance.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Sign in</h1>
            </div>

            <form onSubmit={submitHandle}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleBlur}
                    className={`w-full h-12 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      emailError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleBlur}
                    className={`w-full h-12 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      passwordError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full h-12 ${
                    loading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white font-medium rounded-md transition duration-200`}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Don’t have an account? Join the platform to start managing your
                  F&B business.
                </p>
                <Link
                  to="/admin/sign-up"
                  className="text-blue-500 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
