import * as Permissions from 'expo-permissions';
import * as imgPicker from 'expo-image-picker';
import { Alert } from 'react-native';

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const loadImageFromGallery = async (array) => {
    const response = { status: false, image: null };
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
    if ( resultPermissions.status === 'denied') {
        Alert.alert('Debes de dar permisos para acceder a las imagenes del telefono.')
        return response;
    }
    const result = await imgPicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array
    });
    if (result.cancelled){
        return response;
    }
    response.status = true;
    response.image = result.uri;
    
    return response;
};

export const fileToBlob = async (path) => {
    const file = await fetch(path);
    return await file.blob();
}