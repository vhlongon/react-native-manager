import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import EmployeeList from '../components/EmployeeList';
import { getEmployees } from '../services/firebaseStore';
import LoadingSpinner from '../components/LoadingSpinner';
import useNavigationListener from '../hooks/useNavigationListener';

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'flex-end',
  },
  link: {
    color: '#2089dc',
    textAlign: 'center',
  },
  button: {
    borderWidth: 1.5,
  },
  buttonContainer: {
    width: 80,
    right: 10,
    top: 10,
  },
  iconContainer: {
    marginLeft: 5,
  },
  text: {
    color: '#86939e',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

const transformEmployeesData = data =>
  Object.entries(data).map(([key, value]) => ({ ...value, id: key }));

const EmployeeScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const getData = async () => {
    setLoading(true);
    try {
      const d = await getEmployees();
      setData(d ? transformEmployeesData(d) : null);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useNavigationListener('focus', getData);

  const getContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <Text style={styles.errorMessage}>{error}</Text>;
    }
    return data ? (
      <EmployeeList data={data} />
    ) : (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.text}>No Employees registred</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonWrapper}>
        <Button
          iconRight
          icon={
            <Ionicons
              style={styles.iconContainer}
              name="ios-add-circle"
              size={20}
              color="#2089dc"
            />
          }
          onPress={() => navigation.navigate('AddEmployee')}
          title="Add"
          type="outline"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
      </View>
      {getContent()}
    </View>
  );
};

export default EmployeeScreen;
