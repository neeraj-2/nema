import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Loader from '../screens/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

const AuthStack = showLoader => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName = 'Onboarding';

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)

    GoogleSignin.configure({
      webClientId:
        '77315345904-apjcgf0lmoqainphnotr6s56sj3hp3p0.apps.googleusercontent.com',
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'Loader';
  } else {
    // routeName = 'Login';
  }

  //   //   create ShowLoader hook
  //   const [showLoader, setShowLoader] = React.useState(true);

  //   show loader component for 3000ms
  //     useEffect(() => {
  //       setTimeout(() => {
  //         setShowLoader(false);
  //       }, 4000);
  //     }, []);

  const myOptions = ({navigation}) => ({
    title: '',
    headerStyle: {
      backgroundColor: '#f9fafd',
      shadowColor: '#f9fafd',
      elevation: 0,
    },
    headerLeft: () => (
      <View style={{marginLeft: 10}}>
        <FontAwesome.Button
          name="long-arrow-left"
          size={25}
          backgroundColor="#f9fafd"
          color="#333"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    ),
  });

  return (
    //   initialRouteName={routeName} <--- put in Stack.Navigator
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Nema: Let's Collaborate"
        component={OnboardingScreen}
        options={{headerLeft: null}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        // options={{header: () => null}}
        options={{headerLeft: null}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerLeft: null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
