import React, { useState } from 'react';
import * as SMS from 'expo-sms';
import { StyleSheet, ScrollView, Modal } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import EmployeeForm from '../components/EmployeeForm';
import { updateEmployee, removeEmployee } from '../services/firebaseStore';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
  },
  textButton: {
    borderWidth: 1,
    borderColor: '#2089dc',
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
  },
  iconContainer: {
    marginLeft: 5,
  },
});

const EmployeeDetailsScreen = ({ route, navigation }) => {
  const [error, setError] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { name, shift, phone, id } = route.params;

  const handleSubmit = async values => {
    setLoadingUpdate(true);
    try {
      await updateEmployee({ ...values, id });
      navigation.navigate('Home');
    } catch (e) {
      setError(e.message);
    }
    setLoadingUpdate(false);
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await removeEmployee({ id });
      navigation.navigate('Home');
    } catch (e) {
      setError(e.message);
    }
    setLoadingDelete(false);
  };

  const sendText = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      SMS.sendSMSAsync(phone, `Your work schedule is on ${shift}.`);
    } else {
      // show pop up or something
      console.log('does not support text message');
    }
  };

  return (
    <ScrollView>
      <EmployeeForm
        initialValues={{ name, shift, phone }}
        buttonText="Change details"
        onSubmit={handleSubmit}
        error={error}
        loading={loadingUpdate}
      />
      <Button
        style={styles.textButton}
        containerStyle={styles.buttonContainer}
        title="Text schedule"
        type="outline"
        onPress={sendText}
      />
      <Button
        iconRight
        icon={
          <Ionicons style={styles.iconContainer} name="ios-remove-circle" size={20} color="white" />
        }
        onPress={handleDelete}
        title="Remove Employee"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        loading={loadingDelete}
      />
    </ScrollView>
  );
};

export default EmployeeDetailsScreen;
