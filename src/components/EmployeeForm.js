import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Picker } from 'react-native';
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
  pickerContainer: {
    paddingHorizontal: 10,
  },
  pickerLabel: {
    color: '#86939e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    marginVertical: 10,
    borderColor: '#86939e',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});

const EmployeeForm = ({ error, buttonText, onSubmit = () => {} }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shift, setShift] = useState('');

  const fillForm = () => {
    setName('Name');
    setPhone('123456');
    setShift('night');
  };

  const handleOnSubmit = () => {
    onSubmit(name, phone, shift);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Name"
        value={name}
        placeholder="John"
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        autoCapitalize="none"
        placeholder="555-555-5555"
        autoCorrect={false}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select shift</Text>
        <Picker style={styles.picker} selectedValue={shift} onValueChange={setShift}>
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <Button style={styles.button} title={buttonText} onPress={handleOnSubmit} />
      <TouchableOpacity style={styles.debugContainer} onPress={fillForm}>
        <Text style={styles.debugText}>Fill form</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmployeeForm;
