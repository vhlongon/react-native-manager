import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  link: {
    color: '#2089dc',
    textAlign: 'center',
  },
});

const NavLink = ({ text, to }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(to)}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NavLink;
