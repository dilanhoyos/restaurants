import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { Button } from "react-native-elements";
import { size } from "lodash";
import { validateEmail } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../utils/actions";
import Loading from '../Loading';


export default function RegisterForm() {
    const defaultFormValues = () => {
        return { email: '', password: '', confirm: ''};
    };

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirm, setErrorConfirm] = useState('');
    const [loading, setLoading] = useState(false)
    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });

    }
    const navigation = useNavigation();

    const validateData = () => {
        setErrorConfirm('');
        setErrorEmail('');
        setErrorPassword('');

        if(!validateEmail(formData.email)) {
            setErrorEmail('Debes de ingresar un email valido');
            return false
        }

        if(size(formData.password) < 6) {
            setErrorPassword('Debes ingresar una contraseña de mas de 6 caracteres');
            return false;
        }

        if(formData.password !== formData.confirm) {
            setErrorConfirm('La contraseña debe de ser igual');
            return false;
        }

        return true;

    }

    const DoRegisterUser = async () => {
        if(!validateData()) return;

        setLoading(true);
        
        const result = await registerUser(formData.email, formData.password);
        if(result.error !== null) {
           setErrorEmail(result.error);
           return;
        }
        setLoading(false);

        navigation.navigate('account');
    };
    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email"
                onChange={(e) => onChange(e, 'email')}
                keyboardType='email-address'
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña"
                passwordRules={true}
                secureTextEntry={!showPassword}
                rightIcon={<Icon
                    type='material-community'
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                />}
                onChange={(e) => onChange(e, 'password')}
                errorMessage={errorPassword}
                defaultValue={formData.password}
            />            
            <Input
                containerStyle={styles.input}
                placeholder="confirma tu contraseña"
                passwordRules={true}
                secureTextEntry={!showPassword}
                rightIcon={<Icon
                    type='material-community'
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                />}
                onChange={(e) => onChange(e, 'confirm')}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
            />
            <Button
                title='Registrar Nuevo Usuario'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => DoRegisterUser()}
            />
            <Loading isVisible={loading} text='creado cuenta'/>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    input: {
        width: '100%',

    },
    btnContainer: {
        marginTop: 20,
        width: '95%',
        alignSelf: 'center'
    },
    btn: {
        backgroundColor: '#7f83d7'
    },
    icon: {
        color: '#c1c1c1'
    }
});
