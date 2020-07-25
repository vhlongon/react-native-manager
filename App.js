import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Provider as AuthProvider,
  useAuthContext,
  ADD_ERROR,
  RESTORE_SESSION,
} from './src/context/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoadingSpinner from './src/components/LoadingSpinner';
import * as RootNavigation from './src/RootNavigation';
import AddEmployeeScreen from './src/screens/AddEmployeeScreen';
import EmployeeDetailsScreen from './src/screens/EmployeeDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  const [{ loading, isSignedIn }, dispatch] = useAuthContext();

  useEffect(() => {
    const tryLocalSignin = async () => {
      let userId;

      try {
        userId = await AsyncStorage.getItem('userId');
      } catch (e) {
        dispatch({ type: ADD_ERROR, payload: e.message });
      }

      dispatch({ type: RESTORE_SESSION, payload: userId });
    };

    tryLocalSignin();
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#055694',
        },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: { textAlign: 'center' },
      }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="AddEmployee"
            options={{ title: 'Create employee' }}
            component={AddEmployeeScreen}
          />
          <Stack.Screen
            name="EmployeeDetails"
            options={{ title: 'Employee details' }}
            component={EmployeeDetailsScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            options={{
              title: 'Welcome, please sign in',
              headerLeft: () => null,
            }}
            component={SigninScreen}
          />
          <Stack.Screen
            name="Signup"
            options={{
              title: 'Welcome, please sign up',
              headerLeft: () => null,
            }}
            component={SignupScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default () => (
  <AuthProvider>
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <App />
    </NavigationContainer>
  </AuthProvider>
);
