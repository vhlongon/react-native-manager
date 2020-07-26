import React, { useState } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import {
  signOut,
  updateUserEmail,
  updateUserPassword,
  resignUser,
} from '../services/firebaseStore';
import { SIGN_OUT, ADD_ERROR, useAuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import Resign from '../components/Resign';
import UpdateModal from '../components/UpdateModal';

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 5,
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#797979',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
  },
  overlayContainer: {
    flex: 1,
  },
});

export const IDLE = 'IDLE';
export const ONGOING = 'ONGOING';
export const SETTLED = 'SETTLED';

const AccountScreen = () => {
  const [state, dispatch] = useAuthContext();
  const [confirmation, setConfirmation] = useState(IDLE);
  const [updateStatus, setUpdateStatus] = useState(IDLE);
  const [error, setError] = useState(null);

  const userEmail = state.user?.email || '';

  const handleOnAccept = async providedPassword => {
    setError('');
    setConfirmation(ONGOING);
    try {
      await resignUser(providedPassword);
      setConfirmation(SETTLED);
    } catch (e) {
      setError(e.message);
      setConfirmation(IDLE);
    }
  };

  const handleOnDecline = () => {
    setConfirmation(IDLE);
  };
  // handle request for user to re-sign before making changes
  const handleSubmit = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setError('the passwords do not match');
      return;
    }
    if (confirmation === IDLE) {
      setConfirmation(ONGOING);
      return;
    }

    try {
      setError('');
      setUpdateStatus(ONGOING);
      await updateUserEmail(email);
      await updateUserPassword(password);
      setUpdateStatus(SETTLED);
    } catch (e) {
      setError(e.message);
      setConfirmation(IDLE);
      setUpdateStatus(IDLE);
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
      <Resign
        isVisible={confirmation === ONGOING}
        onAccept={handleOnAccept}
        onDecline={handleOnDecline}
        error={error}
      >
        Please confirm your password to update your account information
      </Resign>
      <AuthForm
        error={error}
        initialValues={{ email: userEmail }}
        buttonText="Update details"
        onSubmit={handleSubmit}
        showConfirmPassword
      />
      <UpdateModal status={updateStatus} onClose={() => setUpdateStatus(IDLE)} />
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
