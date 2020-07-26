import React from 'react';
import { View, StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';
import LoadingSpinner from './LoadingSpinner';

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 260,
  },
  iconContainer: {
    marginLeft: 10,
  },
  overlayContainer: {
    flex: 1,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  contentWrapper: {
    alignItems: 'center',
  },
});

const UpdateModal = ({ status, onClose }) => (
  <Overlay
    isVisible={status === 'ONGOING' || status === 'SETTLED'}
    overlayStyle={styles.overlay}
    containerStyle={styles.container}
    fullScreen
  >
    {status === 'ONGOING' ? (
      <LoadingSpinner />
    ) : (
      <View style={styles.contentWrapper}>
        <Button
          containerStyle={styles.buttonContainer}
          onPress={onClose}
          title="Info has been updated"
          iconRight
          titleStyle={styles.text}
          icon={
            <Ionicons
              style={styles.iconContainer}
              name="ios-close-circle"
              size={30}
              color="white"
            />
          }
        />
      </View>
    )}
  </Overlay>
);

export default UpdateModal;
