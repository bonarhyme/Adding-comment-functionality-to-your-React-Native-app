import { ActivityIndicator, StyleSheet, Text, TextInput, View, } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { auth } from '../firebase';
import { storeDataInStorage } from '../storage/localStorage';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationType } from '../navigators/authNavigator';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Message from '../components/Message';
import Button from '../components/Button';

type Props = {
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
};

const Signup = ({ setIsLoggedIn }: Props) => {
    const navigation: AuthStackNavigationType = useNavigation();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const goToLogin = () => {
        navigation.navigate("Login");
    };

    const handleSignup = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            setSuccess(true);
            // navigation.navigate('Login');
        } catch (error: any) {
            setSuccess(false);
            setError(error?.message || "An error occured while signing up");
        }
        setLoading(false);
    };


    return (
        <View>
            <View style={styles.container}>
                {error ? <Message message={error} variant='red' /> : null}
                {loading ? <ActivityIndicator size='large' /> : null}
                <Input label='Email' value={email} onChangeText={(text) => setEmail(text)} />
                <Input label='Password' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
                <Button title='Signup' onPress={handleSignup} />
                <Text style={styles.promptContainer}>Already have an account? <Text style={styles.prompt} onPress={goToLogin}>Login</Text></Text>
            </View>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        width: "100%",
        maxWidth: 350,
        marginLeft: "auto",
        marginRight: "auto"
    },
    promptContainer: {
        marginTop: 20
    },
    prompt: {
        color: "blue",
        textDecorationLine: "underline"
    }
});