import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <LottieView
      source={require('../assets/animated/animated-stream.json')}
      autoPlay
      loop
    />
  );
};

export default Loader;
