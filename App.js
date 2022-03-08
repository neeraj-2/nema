/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
//loader
import Loader from './screens/Loader';

const AppStack = createStackNavigator();

export default function App() {
  //create ShowLoader hook
  const [showLoader, setShowLoader] = React.useState(true);

  //show loader component for 3000ms
  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 8000);
  }, []);

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {/* show Loder if ShowLoader is true */}
        {showLoader ? (
          <AppStack.Screen name="App is Loading...." component={Loader} />
        ) : null}
        <AppStack.Screen
          name="Nema: Let's Collaborate"
          component={OnboardingScreen}
        />

        <AppStack.Screen name="NEMA" component={OnboardingScreen} />

        <AppStack.Screen name="Login" component={LoginScreen} />
        <AppStack.Screen name="Signup" component={SignupScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
