import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { updateProfile, uploadImage } from '../../utils/actions'
import { loadImageFromGallery } from '../../utils/helpers'


export default function InfoUser({ user, setLoading, setLoadingText }) {
    const [photoURL, setPhotoURL] = useState(user.photoURL);

    const changePhoto = async () => {
        const result = await loadImageFromGallery([1, 1]);
        if(!result.status) return

        setLoadingText('Actualizando Imagen...');
        setLoading(true);
        const resultUpLoadImage = await uploadImage(result.image, 'avatars', user.uid);

        if (!resultUpLoadImage.statusResponse) {
            setLoading(false);
            Alert.alert('Ha ocurrido un problema mientras se exportar la imagen');
            return;
        }
        const resultUpdateProfile = await updateProfile({ photoURL: resultUpLoadImage.url });
        setLoading(false);
        if (resultUpdateProfile.statusResponse){
            setPhotoURL(resultUpLoadImage.url);
        } else {
            Alert.alert('Ha ocurrido un problema mientras se actualiza la imagen');
        }
    }

    return (
        <View style={styles.container}>
            <Avatar
                rounded={true}
                size='large'
                onLongPress={changePhoto}
                
                containerStyle={styles.avatar}
                source= {
                    photoURL ? { uri: photoURL } : require('../../assets/avatar-default.jpg')
                }
            />
            <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : 'Anonimo'
                    }
                </Text>
                <Text>
                    {user.email}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        paddingVertical: 30
    },
    displayName: {
        fontWeight: 'bold',
        paddingBottom: 5
    },
    infoUser: {
        marginLeft: 20
    }
});
