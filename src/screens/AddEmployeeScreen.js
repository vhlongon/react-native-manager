import React from 'react';
import { View } from 'react-native';
import EmployeeForm from '../components/EmployeeForm';

const AddEmployeeScreen = () => (
  <View>
    <EmployeeForm buttonText="create" />
  </View>
);

export default AddEmployeeScreen;
