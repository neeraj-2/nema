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
  const constraints = {
    audio: true,
    video: true,
  };

  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    async function enableStream() {
      try {
        // alert('hey');
        const stream = await mediaDevices.getUserMedia(constraints);
        setLocalStream(stream);
        if (localStream == null) {
          alert('local stream is null');
        }
      } catch (err) {
        // Removed for brevity
        alert('uff');
      }
    }

    if (!localStream) {
      enableStream();
    } else {
      return function cleanup() {
        localStream.getTracks().forEach(track => {
          track.stop();
        });
      };
    }
  }, [localStream, constraints]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <Text>Breh</Text>
        {/* <RTCView /> */}
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
