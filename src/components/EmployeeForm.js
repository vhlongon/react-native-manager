import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Picker } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import casual from 'casual-browserify';

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

const isEmpty = object => !Object.values(object).every(Boolean);
const daysOfTheWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const EmployeeForm = ({
  error,
  buttonText,
  onSubmit = () => {},
  initialValues = { name: '', phone: '', shift: '' },
  loading,
}) => {
  const [values, setValues] = useState(initialValues);

  const fillForm = () => {
    setValues({
      name: casual.full_name,
      phone: casual.phone,
      shift: casual.random_element(daysOfTheWeek),
    });
  };

  const setValue = name => value => {
    setValues(state => ({ ...state, [name]: value }));
  };

  const handleOnSubmit = () => {
    onSubmit(values);
  };

  const disabled = isEmpty(values);

  return (
    <View>
      <View style={styles.container}>
        <Input
          label="Name"
          value={values.name}
          placeholder="John"
          onChangeText={setValue('name')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          label="Phone"
          value={values.phone}
          onChangeText={setValue('phone')}
          placeholder="555-555-5555"
          autoCompleteType="tel"
          keyboardType="phone-pad"
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select shift</Text>
          <Picker
            style={styles.picker}
            selectedValue={values.shift}
            onValueChange={setValue('shift')}
          >
            {daysOfTheWeek.map(day => (
              <Picker.Item label={day} value={day} key={day} />
            ))}
          </Picker>
        </View>
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <Button
          style={styles.button}
          title={buttonText}
          onPress={handleOnSubmit}
          loading={loading}
          disabled={disabled}
        />
        <TouchableOpacity style={styles.debugContainer} onPress={fillForm}>
          <Text style={styles.debugText}>Fill form</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmployeeForm;
