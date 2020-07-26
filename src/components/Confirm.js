import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '50%',
    paddingHorizontal: 10,
  },
  noButton: {
    backgroundColor: '#dc2020',
  },
  yesButton: {
    backgroundColor: '#20dc2e',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
  },
  contentWrapper: {
    backgroundColor: 'white',
    position: 'relative',
    margin: 10,
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    color: '#86939e',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
const Confirm = ({ children, isVisible, onAccept, onDecline, onClose = () => {} }) => (
  <Overlay
    overlayStyle={styles.overlay}
    containerStyle={styles.container}
    isVisible={isVisible}
    fullScreen
    onBackdropPress={onClose}
    transparent
  >
    <View style={styles.contentWrapper}>
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.yesButton}
          title="Yes"
          onPress={onAccept}
        />
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.noButton}
          title="No"
          onPress={onDecline}
        />
      </View>
    </View>
  </Overlay>
);

export default Confirm;
