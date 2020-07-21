import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

const styles = StyleSheet.create({
  container: { marginTop: 40 },
  button: {
    margin: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    margin: 15,
  },
  debugContainer: {
    position: 'absolute',
    top: -15,
    right: 10,
    borderWidth: 1,
    borderColor: '#E68400',
    padding: 5,
    borderRadius: 2,
  },
  debugText: {
    color: '#E68400',
  },
});

const AuthForm = ({ error, buttonText, onSubmit = () => {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fillForm = () => {
    setEmail('test@test.com');
    setPassword('password');
  };

  const handleOnSubmit = () => {
    onSubmit(email, password);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <Button style={styles.button} title={buttonText} onPress={handleOnSubmit} />
      <TouchableOpacity style={styles.debugContainer} onPress={fillForm}>
        <Text style={styles.debugText}>Fill form</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;
