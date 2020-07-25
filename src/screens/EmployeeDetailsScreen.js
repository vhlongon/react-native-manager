import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import EmployeeForm from '../components/EmployeeForm';
import { updateEmployee, removeEmployee } from '../services/firebaseStore';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
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
      setError(e);
    }
    setLoadingUpdate(false);
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await removeEmployee({ id });
      navigation.navigate('Home');
    } catch (e) {
      setError(e);
    }
    setLoadingDelete(false);
  };

  return (
    <>
      <EmployeeForm
        initialValues={{ name, shift, phone }}
        buttonText="update"
        onSubmit={handleSubmit}
        error={error}
        loading={loadingUpdate}
      />
      <Button
        iconRight
        icon={
          <Ionicons style={styles.iconContainer} name="ios-remove-circle" size={20} color="white" />
        }
        onPress={handleDelete}
        title="Remove"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        loading={loadingDelete}
      />
    </>
  );
};

export default EmployeeDetailsScreen;
