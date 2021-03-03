import React from "react"
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

export default function UserGuest() {
    const navigation = useNavigation();
    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        ><Image
            source={require("../../assets/restaurant-logo.png")}
            resizeMode="contain"
            style={styles.image}
        />
        <Text style={styles.title}>Consulta tu perfil en Restaurants</Text>
        <Text style={styles.description}>Como describirias tu mejor restaurante? Busca y vizualiza los mejores restaurantes de una forma sencilla, vota cual te ha gustado mas! Comenta!</Text>
        <Button
            buttonStyle={styles.button}
            title='Ver tu perfil'
            onPress={() => navigation.navigate('login')}
        />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"
    },
    description: {
        textAlign: 'justify',
        marginBottom: 20,
        color: "#0c0c0c"
    },
    button: {
        backgroundColor: '#5c8c58'
    }
})
