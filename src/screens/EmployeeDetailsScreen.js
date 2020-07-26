import React, { useState } from 'react';
import * as SMS from 'expo-sms';
import { StyleSheet, ScrollView, View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import EmployeeForm from '../components/EmployeeForm';
import { updateEmployee, removeEmployee } from '../services/firebaseStore';
import Confirm from '../components/Confirm';

const styles = StyleSheet.create({
  fireButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  textButton: {
    borderWidth: 1,
    borderColor: '#2089dc',
  },
  buttonsContainer: {
    marginHorizontal: 10,
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
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
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

  const deleteEmployee = async () => {
    try {
      await removeEmployee({ id });
      setShowConfirm(false);
      navigation.navigate('Home');
    } catch (e) {
      setError(e.message);
    }
  };

  const sendText = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      SMS.sendSMSAsync(phone, `Your work schedule is on ${shift}.`);
    } else {
      // in case of simulators we get here
      console.log('does not support text message');
    }
  };

  return (
    <ScrollView>
      <Confirm
        isVisible={showConfirm}
        onAccept={deleteEmployee}
        onDecline={() => {
          setShowConfirm(false);
        }}
      >
        Are you sure you want to fire the employee?
      </Confirm>
      <EmployeeForm
        initialValues={{ name, shift, phone }}
        buttonText="Change details"
        onSubmit={handleSubmit}
        error={error}
        loading={loadingUpdate}
      />
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.textButton}
          containerStyle={styles.buttonContainer}
          title="Text schedule"
          type="outline"
          onPress={sendText}
        />
        <Button
          buttonStyle={styles.fireButton}
          iconRight
          icon={
            <Ionicons
              style={styles.iconContainer}
              name="ios-remove-circle"
              size={20}
              color="white"
            />
          }
          containerStyle={styles.buttonContainer}
          title="Fire Employee"
          onPress={() => setShowConfirm(true)}
        />
      </View>
    </ScrollView>
  );
};

export default EmployeeDetailsScreen;
