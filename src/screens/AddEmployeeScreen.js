import React, { useState } from 'react';
import { addEmployee } from '../services/firebaseStore';
import EmployeeForm from '../components/EmployeeForm';

const AddEmployeeScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async values => {
    setLoading(true);
    try {
      await addEmployee(values);
      navigation.navigate('Home');
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <EmployeeForm
      buttonText="Add Employee"
      onSubmit={handleOnSubmit}
      error={error}
      loading={loading}
    />
  );
};

export default AddEmployeeScreen;
