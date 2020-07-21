import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from '../services/firebaseStore';
import { SIGN_OUT, ADD_ERROR, useAuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
  link: {
    color: '#2089dc',
    textAlign: 'center',
  },
});

const HomeScreen = () => {
  const [, dispatch] = useAuthContext();

  const handleSignout = async () => {
    try {
      await signOut();
      dispatch({ type: SIGN_OUT });
    } catch (e) {
      dispatch({ type: ADD_ERROR, payload: e.message });
    }
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handleSignout}>
        <Text style={styles.link}>Sign-out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
