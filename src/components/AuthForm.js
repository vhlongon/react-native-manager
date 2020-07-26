import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

const styles = StyleSheet.create({
  container: { marginTop: 40, marginLeft: 10, marginRight: 10 },
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

const isEmpty = object => !Object.values(object).every(Boolean);
const AuthForm = ({
  error,
  buttonText,
  onSubmit = () => {},
  initialValues = { email: '', password: '', confirmPassword: '' },
  showConfirmPassword,
}) => {
  const [email, setEmail] = useState(initialValues.email);
  const [password, setPassword] = useState(initialValues.password);
  const [confirmPassword, setConfirmPassword] = useState(initialValues.password);

  const fillForm = () => {
    setEmail('test@test.com');
    setPassword('password');
  };

  const handleOnSubmit = () => {
    onSubmit(email, password, showConfirmPassword ? confirmPassword : null);
  };

  const disabled = isEmpty({
    email,
    password,
    ...(showConfirmPassword ? { confirmPassword } : {}),
  });

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

      {showConfirmPassword && (
        <Input
          label="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      <Button
        style={styles.button}
        title={buttonText}
        onPress={handleOnSubmit}
        disabled={disabled}
      />
      <TouchableOpacity style={styles.debugContainer} onPress={fillForm}>
        <Text style={styles.debugText}>Fill form</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;
