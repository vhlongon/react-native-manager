import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthContext, CLEAR_ERROR } from '../context/AuthContext';

const styles = StyleSheet.create({
  link: {
    color: '#2089dc',
    textAlign: 'center',
  },
});

const NavLink = ({ text, to }) => {
  const [, dispatch] = useAuthContext();
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate(to);
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NavLink;
