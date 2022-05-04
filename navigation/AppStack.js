import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
// import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MessageScreen from '../screens/MessageScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CallScreen from '../screens/CallScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Sweet Home Alabama"
      component={HomeScreen}
      options={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        // headerRight: () => (
        //   <View style={{marginRight: 10}}>
        //     <FontAwesome5.Button
        //       name="plus"
        //       size={22}
        //       backgroundColor="#fff"
        //       color="#2e64e5"
        //       onPress={() => navigation.navigate('AddPost')}
        //     />
        //   </View>
        // ),
      }}
    />

    {/* <Stack.Screen
      name="CallScreen"
      component={CallScreen}
      options={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        // headerRight: () => (
        //   <View style={{marginRight: 10}}>
        //     <FontAwesome5.Button
        //       name="plus"
        //       size={22}
        //       backgroundColor="#fff"
        //       color="#2e64e5"
        //       onPress={() => navigation.navigate('AddPost')}
        //     />
        //   </View>
        // ),
      }}
    /> */}
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessageScreen} />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="ChatBot"
        component={MessageStack}
        options={({route}) => ({
          // tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="User Profile"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppStack = () => {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={Tabs} />
      <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{
          title: 'Create a Stream',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#1c1c1c',
            shadowOpacity: 0,
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
