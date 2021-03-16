import { isEmpty } from 'lodash';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { reauthenticate, updateEmail, updateProfile } from '../../utils/actions';
import { validateEmail } from '../../utils/helpers';


export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email);
    const [password, setPassword] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        const resultReauthenticate = await reauthenticate(password);

        if (!resultReauthenticate.statusResponse) {
            setLoading(false);
            setErrorPassword('Contraseña incorrecta');
            return;
        }

        const resultUpdateEmail = await updateEmail(newEmail);
        setLoading(false);

        if (!resultUpdateEmail.statusResponse) {
            setErrorEmail('Correo ya creado');
            return;
        }
        setReloadUser(true);
        toastRef.current.show('Se han actualizado el email', 3000);
        setShowModal(false);
    }

    const validateForm = () => {
        setErrorEmail(null);
        setErrorPassword(null);
        let isValid = true;
        if(!validateEmail(newEmail)){
            setErrorEmail('Debes ingresar un email valido');
            isValid = false;
        }
        
        if(newEmail === email){
            setErrorEmail('Debes ingresar un email diferente al actual');
            isValid = false;
        }

        if(isEmpty(password)){
            setErrorPassword('Debes ingresar tu contraseña');
            isValid = false;
        }
        return isValid;
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder='Ingresa el nuevo Correo'
                containerStyle={styles.input}
                defaultValue={email}
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: '#c2c2c2'
                }}
            />
                <Input
                placeholder='Ingresa la contraseña'
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={showPassword ? 'eye-off-outline' : 'eye-outline' }
                        iconStyle={{ color: '#c2c2c2' }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title='Cambiar Email'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingVertical: 10
    },
    input: {
        marginTop: 10
    },
    btnContainer: {
        width: '95%'
    },
    btn: {
        backgroundColor: '#442484'
    }
})