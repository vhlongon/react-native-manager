import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import EmployeeList from '../components/EmployeeList';

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
});

const EmployeeScreen = ({ navigation }) => {
  console.log('EmployeeScreen');
  return (
    <View>
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
      <EmployeeList />
    </View>
  );
};

export default EmployeeScreen;
