import React, { useEffect, useState } from 'react';

import { LoginComponent } from '../components/Auth';
import LandingLogin from '../components/Landing/login/LandingLogin';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  });

  return (
    <>
      {isLoading ? (
        <>
          <LandingLogin />
        </>
      ) : (
        <LoginComponent />
      )}
    </>
  );
};
export default Login;
