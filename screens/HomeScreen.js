/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import {firebase} from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const user = firebase.auth().currentUser;

  const startStreaming = () => {
    // alert('Start Streaming');
    // alert(user.displayName + ' started streaming');
    navigation.navigate('CallScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/nema.png')} style={styles.logo} />
      <Text style={styles.text}>NEMA</Text>

      <FormButton
        buttonTitle="Start Streaming"
        onPress={() => startStreaming()}
      />

      <FormButton
        buttonTitle="Join a Stream"
        // onPress={() => login(email, password)}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 70,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
