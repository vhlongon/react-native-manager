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
      setError(e);
    }
    setLoading(false);
  };

  return (
    <EmployeeForm buttonText="Create" onSubmit={handleOnSubmit} error={error} loading={loading} />
  );
};

export default AddEmployeeScreen;
