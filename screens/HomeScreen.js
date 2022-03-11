import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

const HomeScreen = () => {

    const {user,logout} = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Welcome 
            {user.uid}
        </Text>
        <FormButton
            buttonTitle="Sign Out"
            onPress={() => logout()}
        />
        </View>
    ); 
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,

    },
    text: {
        fontSize: 30,
        color: '#333333',
    }
});
        

