<script src="http://localhost:8097"></script>;
import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  mediaDevices,
  RTCView,
  MediaStream,
  MediaStreamConstraints,
} from 'react-native-webrtc';

const CallScreen = ({navigation}) => {
  const [localStream, setLocalStream] = useState(null);

  //   const constraints = {
  //     audio: true,
  //     video: {
  //       width: {min: 1024, ideal: 1280, max: 1920},
  //       height: {min: 576, ideal: 720, max: 1080},
  //       facingmode: 'user',
  //     },
  //   };
  const constraints = {
    audio: true,
    video: {
      facing: 'front',
      height: 300,
      width: 300,
    },
  };

  //   (async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Cool Photo App Camera Permission',
  //           message:
  //             'Cool Photo App needs access to your camera ' +
  //             'so you can take awesome pictures.',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the camera');
  //       } else {
  //         console.log('Camera permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   })();

  //   useEffect(() => {
  //     async function enableStream() {
  //       try {
  //         // console.log('breh');
  //         const stream = await mediaDevices
  //           .getUserMedia(constraints)
  //           .then(setLocalStream(stream));
  //         setLocalStream(stream);
  //       } catch (err) {
  //         // Removed for brevity
  //         alert('uff');
  //       }
  //     }
  //     if (!localStream) {
  //       enableStream();
  //     } else {
  //       return function cleanup() {
  //         localStream.getTracks().forEach(track => {
  //           track.stop();
  //         });
  //       };
  //     }
  //   }, [localStream, constraints]);

  //   (async () => {
  //     await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: {
  //         width: 640,
  //         height: 480,
  //         frameRate: 30,
  //         facingMode: 'user',
  //         deviceId: videoSourceId,
  //       },
  //     });
  //     let devices = await mediaDevices.enumerateDevices();
  //     console.log(devices);
  //   })();

  //   async function enableStream() {
  //     try {
  //       // console.log('breh');
  //       const stream = await mediaDevices
  //         .getUserMedia(constraints)
  //         .then(setLocalStream(stream));
  //       setLocalStream(stream);
  //     } catch (err) {
  //       // Removed for brevity
  //       alert('uff');
  //     }
  //   }
  //   enableStream();

  const startLocalStream = async () => {
    const devices = await mediaDevices.enumerateDevices();
    // console.log(devices);
    console.log(localStream && localStream.toURL());

    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };
  startLocalStream();

  //   const videoRef = useRef();
  //   if (localStream && videoRef.current && !videoRef.current.srcObject) {
  //     videoRef.current.srcObject = localStream;
  //   }

  //   const handleCanPlay = () => {
  //     videoRef.current.play();
  //   };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <Text>{localStream == null ? 'yeah' : 'Not null !'}</Text>
        <Text>{typeof localStream}</Text>

        {/* <RTCView streamURL="3f8139a1-fd92-430e-b5af-c5530243d5f2" /> */}
        {/* <View>
          <video ref={videoRef} onPlay={handleCanPlay} autoPlay />
        </View> */}
        <View style={styles.container}>
          {localStream && (
            <RTCView
              style={{height: 300, width: 300}}
              zOrder={20}
              objectFit={'cover'}
              mirror={true}
              streamURL={localStream.toURL()}
            />
          )}
        </View>
        {/* <View>
          <RTCView streamURL={localStream.toURL()} />
        </View> */}
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
  rtc: {
    width: '100%',
    height: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 70,
    paddingTop: 50,
  },
});

export default CallScreen;
