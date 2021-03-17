import { isEmpty, size } from 'lodash';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { reauthenticate, updateEmail, updatePassword } from '../../utils/actions';
import { validateEmail } from '../../utils/helpers';

export default function ChangePasswordForm({ setShowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [errorNewPassword, setErrorNewPassword] = useState(null);
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        const resultReauthenticate = await reauthenticate(currentPassword);

        if (!resultReauthenticate.statusResponse) {
            setLoading(false);
            setErrorCurrentPassword('Contraseña incorrecta');
            return;
        }

        const resultUpdatePassword = await updatePassword(newPassword);
        setLoading(false);

        if (!resultUpdatePassword.statusResponse) {
            setErrorNewPassword('Error cambiando contraseña intente mas tarde');
            return;
        }

        toastRef.current.show('Se han actualizado la contraseña', 3000);
        setShowModal(false);
    }

    const validateForm = () => {
        setErrorNewPassword(null);
        setErrorCurrentPassword(null);
        setErrorConfirmPassword(null);

        let isValid = true;

        if(isEmpty(currentPassword)){
            setErrorCurrentPassword('Debes ingresar tu contraseña');
            isValid = false;
        }

        if(size(newPassword) < 6){
            setErrorNewPassword('Debes ingresar una contraseña de al menos 6 caracteres');
            isValid = false;
        }

        if(newPassword !== confirmPassword){
            setErrorConfirmPassword('La contraseña debe ser igual');
            setErrorNewPassword('La contraseña debe ser igual');
            isValid = false;
        }

        if(newPassword === currentPassword){
            setErrorNewPassword('Debes ingresar una contraseña distinta');
            setErrorConfirmPassword('Debes ingresar una contraseña distinta');
            setErrorCurrentPassword('Debes ingresar una contraseña distinta');

            isValid = false;
        }

        return isValid;
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder='Ingresa la contraseña actual'
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
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
            <Input
                placeholder='Ingresa la nueva contraseña'
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
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
            <Input
                placeholder='Vuelve a ingresar la contraseña'
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
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
                title='Cambiar Contraseña'
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
