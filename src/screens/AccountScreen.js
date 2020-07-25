import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { signOut, updateUserEmail, updateUserPassword } from '../services/firebaseStore';
import { SIGN_OUT, ADD_ERROR, useAuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const styles = StyleSheet.create({
  link: {
    color: '#2089dc',
    textAlign: 'center',
  },
  iconContainer: {
    marginLeft: 5,
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#797979',
  },
});

const AccountScreen = () => {
  const [state, dispatch] = useAuthContext();

  const userEmail = state.user?.email || '';

  // handle request for user to re-sign before making changes
  const handleSubmit = async (email, password) => {
    try {
      await Promise.all([updateUserEmail(email), updateUserPassword(password)]);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSignout = async () => {
    try {
      await signOut();
      await AsyncStorage.removeItem('token');
      dispatch({ type: SIGN_OUT });
    } catch (e) {
      dispatch({ type: ADD_ERROR, payload: e.message });
    }
  };

  return (
    <View>
      <AuthForm
        initialValues={{ email: userEmail }}
        buttonText="Update details"
        onSubmit={handleSubmit}
      />
      <Button
        iconRight
        icon={<AntDesign style={styles.iconContainer} name="logout" size={20} color="white" />}
        onPress={handleSignout}
        title="Sign out"
        containerStyle={styles.buttonContainer}
        color="#797979"
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default AccountScreen;
