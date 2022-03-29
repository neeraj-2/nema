import React, {useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  mediaDevices,
  RTCView,
  MediaStream,
  MediaStreamConstraints,
} from 'react-native-webrtc';

const CallScreen = ({navigation}) => {
  const [mediaStream, setMediaStream] = useState(null);

  const constraints = {
    audio: true,
    video: {
      mandatory: {
        minWidth: 500,
        minHeight: 300,
        minFrameRate: 30,
      },
      //   facingMode,
      //   optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
    },
  };

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setMediaStream(stream);
      } catch (err) {
        // Removed for brevity
      }
    }
    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      };
    }
  }, [mediaStream, constraints]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <Text>{mediaStream}</Text>
        {/* <RTCView streamURL={mediaStream.toURL()} /> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    ...StyleSheet.absoluteFill,
  },
  stream: {
    flex: 1,
  },
  footer: {
    backgroundColor: Colors.lighter,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CallScreen;
