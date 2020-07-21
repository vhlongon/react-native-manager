import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
import { signOut } from '../services/firebaseStore';
import { SIGN_OUT, ADD_ERROR, useAuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
  link: {
    color: '#2089dc',
    textAlign: 'center',
  },
});

const AccountScreen = () => {
  const [, dispatch] = useAuthContext();

  const handleSignout = async () => {
    try {
      await signOut();
      await AsyncStorage.removeItem('userId');
      dispatch({ type: SIGN_OUT });
    } catch (e) {
      dispatch({ type: ADD_ERROR, payload: e.message });
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={handleSignout}>
        <Text style={styles.link}>Sign-out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
