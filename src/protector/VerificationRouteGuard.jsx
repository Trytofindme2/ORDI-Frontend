import { useContext } from 'react';
import Verification from '../pages/user/verification';
import SignUp from '../pages/user/signup';
import { VerificationContext } from '../context/verificationContext';

const VerificationRouteGuard = () => {
  const { email, password } = useContext(VerificationContext);
  console.log(email);
  return email ? <Verification /> : <SignUp />;
};

export default VerificationRouteGuard;
