import React from 'react';
import { SafeAreaView, AsyncStorage } from 'react-native';
import AuthForm from '../components/AuthForm';
import { signIn } from '../services/firebaseStore';
import { ADD_ERROR, SIGN_IN, SIGNING_IN, useAuthContext } from '../context/AuthContext';
import NavLink from '../components/NavLink';

const SigninScreen = () => {
  const [{ error }, dispatch] = useAuthContext();

  const handleOnSubmit = async (email, password) => {
    try {
      dispatch({ type: SIGNING_IN });
      const { uid } = await signIn(email, password);
      await AsyncStorage.setItem('userId', uid);
      dispatch({ type: SIGN_IN, payload: uid });
    } catch (e) {
      dispatch({ type: ADD_ERROR, payload: e.message });
    }
  };

  return (
    <SafeAreaView>
      <AuthForm onSubmit={handleOnSubmit} buttonText="Sign-in" error={error} />
      <NavLink text="Don't have an account? Create one" to="Signup" />
    </SafeAreaView>
  );
};

export default SigninScreen;
