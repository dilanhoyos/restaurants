import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements'
import Loading from '../../components/Loading';
import { useNavigation } from "@react-navigation/native";
import { loginWithEmailAndPassword } from '../../utils/actions';
import { validateEmail } from '../../utils/helpers';
import { isEmpty } from 'lodash';

export default function LoginForm() {


    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    const navigation = useNavigation();

    const validateData = () => {
        setErrorEmail('');
        setErrorPassword('');

        if(!validateEmail(formData.email)) {
            setErrorEmail('Debes de ingresar un email valido');
            return false
        }

        if(isEmpty(formData.password)) {
            setErrorPassword('Debes ingresar tu contraseña');
            return false
        }

        return true;
    }

    const doLogin = async () => {
        if(!validateData()) return;

        setLoading(true);
        const result = await loginWithEmailAndPassword(formData.email, formData.password);
        setLoading(false);

        if(result.error !== null) {
           setErrorEmail(result.error);
           setErrorPassword(result.error);
           return;
        }

        navigation.navigate('account');
    }

    return (
        <View style={styles.container}>
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
            <Button
                title='Iniciar Sesion'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            <Loading isVisible={loading} text='loggeando'/>
        </View>
    )
};

const defaultFormValues = () => {
    return { email: '', password: ''};
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
