import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const LoadingSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

export default LoadingSpinner;
