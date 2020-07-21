/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import EmployeeListScreen from './EmployeeListScreen';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  console.log('homescreen');
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: 'rgba(4, 86, 147, 0.1)',
        inactiveTintColor: '#055694',
        labelStyle: { fontSize: 12 },
      }}>
      <Tab.Screen
        title="Employees"
        name="Employees"
        component={EmployeeListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="ios-people" size={20} color={focused ? '#2089dc' : '#055694'} />
          ),
        }}
      />
      <Tab.Screen
        title="Account"
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="gear" size={20} color={focused ? '#2089dc' : '#055694'} />
          ),
        }}
        tabBar
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
