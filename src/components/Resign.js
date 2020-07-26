import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';

const styles = StyleSheet.create({
  buttonsContainer: {
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
  closeButtonContainer: {
    position: 'absolute',
    width: 40,
    top: 0,
    right: 0,
  },
  closeButton: {
    backgroundColor: 'white',
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
    paddingTop: 40,
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
  errorMessage: {
    fontSize: 16,
    color: 'red',
    margin: 10,
    marginTop: 0,
  },
});
const Resign = ({ children, isVisible, onAccept, onDecline, onClose = () => {}, error }) => {
  const [password, setPassword] = useState('');

  const handleAccept = () => {
    onAccept(password);
  };

  return (
    <Overlay
      overlayStyle={styles.overlay}
      containerStyle={styles.container}
      isVisible={isVisible}
      fullScreen
      onBackdropPress={onClose}
      transparent
    >
      <View style={styles.contentWrapper}>
        <Button
          containerStyle={styles.closeButtonContainer}
          onPress={onDecline}
          type="clear"
          icon={<Ionicons name="ios-close-circle" size={30} color="darkgray" />}
        />
        <View>
          <Text style={styles.text}>{children}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.yesButton}
            title="Confirm"
            onPress={handleAccept}
          />
        </View>
      </View>
    </Overlay>
  );
};

export default Resign;
