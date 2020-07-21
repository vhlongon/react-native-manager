import React from 'react';
import { SafeAreaView, AsyncStorage } from 'react-native';
import AuthForm from '../components/AuthForm';
import { signUp } from '../services/firebaseStore';
import { ADD_ERROR, SIGN_IN, SIGNING_IN, useAuthContext } from '../context/AuthContext';
import NavLink from '../components/NavLink';

const SignupScreen = () => {
  const [{ error }, dispatch] = useAuthContext();

  const handleOnSubmit = async (email, password) => {
    try {
      dispatch({ type: SIGNING_IN });
      const response = await signUp(email, password);
      const userId = response.user.uid;
      await AsyncStorage.setItem('userId', userId);
      dispatch({ type: SIGN_IN, payload: userId });
    } catch (e) {
      dispatch({ type: ADD_ERROR, payload: e.message });
    }
  };

  return (
    <SafeAreaView>
      <AuthForm onSubmit={handleOnSubmit} buttonText="Sign-up" error={error} />
      <NavLink text="Already have an account? Sign in" to="Signin" />
    </SafeAreaView>
  );
};

export default SignupScreen;
