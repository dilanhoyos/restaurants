import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native";
import LoginForm from './LoginForm';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require('../../assets/restaurant-logo.png')}
                resizeMode='contain'
                style={styles.image}
            />
            <View style={styles.container}>

                <LoginForm/>
                <Divider style={styles.divider}/>
                <CreateAccount/>
            </View>
        </KeyboardAwareScrollView>
    )
}

function CreateAccount(props) {
    const navigation = useNavigation();

    return (
        <Text style={styles.register}
            onPress={() => (navigation.navigate('register'))}
        >
            Aun no tienes una Cuenta?{' '}
            <Text style={styles.btnRegister}>
                Registrate
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: '100%',
        marginBottom: 20
    },
    container: {
        marginHorizontal: 40
    },
    divider: {
        backgroundColor: '#0c0c0c',
        margin: 40
    },
    register: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: 'center'
    },
    btnRegister: {
        color: '#7f83d7',
        fontWeight: 'bold'
    }
})
